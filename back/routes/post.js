const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const { Post, Comment, User, Image, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

// 업로드 폴더 있는지 검사
try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("upoload folder does not exist--- ", error);
  fs.mkdirSync("uploads");
}

// 이미지 업로드용 Multer
// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, res, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname); // 확장자만 추출 .png
//       const basename = path.basename(file.originalname, ext);

//       done(null, basename + "_" + new Date().getTime() + ext);
//     },
//   }),
//   limits: { fileSize: 1024 * 1024 * 20 }, //20MB
// });

// 이미지 업로드 multer to s3
AWS.config.update({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "nextjs-nodebird",
    key(req, file, cb) {
      const filePath = `original/${Date.now()}_${path.basename(
        file.originalname
      )}`;
      cb(null, filePath);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 20 },
});

// 게시물 1개 조회
router.get("/", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.query.postId } });
    if (!post) return res.status(404).send("게시물이 존재하지 않습니다.");

    const fullPost = await Post.findOne({
      where: { id: req.query.postId },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },

        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },

        {
          //좋아요 누른사람
          model: User,
          as: "Likers",
          attributes: {
            include: ["id"],
          },
        },
      ],
    });

    res.status(200).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// 등록
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  console.log(`[ post.js ]::  : `, req.body);

  try {
    // 아래는 json 데이터 받은 컨텐츠 정보 등록 :본글
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    const hashtags = req.body.content.match(/#[^/\s$]+/g);

    // 해쉬태그
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );

      await post.addHashtags(result.map((tagArr) => tagArr[0]));
    }

    // 이미지 path
    if (req.body.images_multer) {
      if (Array.isArray(req.body.images_multer)) {
        // 이미지를 여러개 올리면 images_multer : [xx.png, xx.png]

        const images = await Promise.all(
          req.body.images_multer.map((img) => Image.create({ src: img }))
        );

        await post.addImages(images);
      } else {
        // 이미지를 한개 올리면 images_multer : xx.png
        const image = await Image.create({ src: req.body.images_multer });
        await post.addImages(image);
      }
    }

    // 리턴해야하는 데이터 형태
    // const beReturned = {
    //   id: 0 ,
    //   user: {id: '', nickname:''},
    //   content: '',
    //   images: [],
    //   comments: [],
    // };
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },

        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },

        {
          //좋아요 누른사람
          model: User,
          as: "Likers",
          attributes: {
            include: ["id"],
          },
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 삭제
router.post("/:postId/delete", isLoggedIn, async (req, res, next) => {
  console.log("\n\n\n req.body === ", req.body);

  try {
    const result = await Post.destroy({
      where: { id: req.body.id, UserId: req.user.id },
    });

    res.status(200).json({ PostId: req.body.id, result });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 코멘트 등록 & 수정
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      UserId: req.user.id,
      PostId: req.params.postId,
      content: req.body.content,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ["id", "nickname"] }],
    });

    // 리턴해야하는 데이터 구조
    // {
    //     user: { id: "21", nickname: "hoho" },
    //     id: 1,
    //     content: "Oh first Post",
    //  };

    res.status(201).json(fullComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:postId/liked", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.postId;
    const isLiked = req.body.isLiked;

    const post = await Post.findOne({ where: { id } });

    if (!post) return res.status(403).send("게시글이 존재하지 않습니다.");

    if (isLiked) {
      await post.addLikers(req.user.id);
    } else {
      await post.removeLikers(req.user.id);
    }

    res.json({ PostId: post.id, UserId: req.user.id, isLiked: isLiked });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/images",
  isLoggedIn,
  // <input type="file" name = "images_multer" multiple
  // 이미지 한장일 경우 upload.single
  // 파일없이 텍스트만 올린다. upload.none();
  upload.array("images_multer"),
  async (req, res, next) => {
    console.log("req.images_multer", req.files);

    // multer.diskStorage()
    // res.json(req.files.map((file) => file.filename));

    //multer multerS3 업로드 후에는 file.location
    res.json(req.files.map((file) => file.location));
  }
);

router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{ model: Post, as: "Retweet" }],
    });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    if (
      // 내글 리트윗 방지
      req.user.id === post.UserId ||
      // 내글을 타인이 리트윗 한 후 다시 내가 리트윗 방지
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(401).send("자신의 글은 리트윗할 수 없습니다. ");
    }

    // 리트윗 아이디가 존재하면 그 아이디 사용
    // 없으면 첫번째 리트윗 이므로 해당 게시글 아이디 사용
    const retweetTargetId = post.RetweetId || post.id;

    // 내가 이미 리트윗 한 게시글인지 체크
    const postRetweetedAlready = await Post.findOne({
      where: { UserId: req.user.id, RetweetId: retweetTargetId },
    });

    if (postRetweetedAlready) {
      return res.status(403).send("이미 리트윗한 포스트입니다.");
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        { model: Image },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["id", "nickname"],
          },
        },
        {
          //좋아요 누른사람
          model: User,
          as: "Likers",
          attributes: {
            include: ["id"],
          },
        },
      ],
    });

    res.status(201).json(retweetWithPrevPost);
  } catch (error) {}
});
module.exports = router;
