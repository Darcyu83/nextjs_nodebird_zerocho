const express = require("express");
const router = express.Router();
const { Post, Comment, User, Image } = require("../models");

const { isLoggedIn } = require("./middlewares");

// 등록
router.post("/", isLoggedIn, async (req, res, next) => {
  console.log(`[ post.js ]::  : `, req.body);

  try {
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });

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

    console.log(fullPost);

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 삭제
router.post("/:postId", isLoggedIn, async (req, res, next) => {
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

module.exports = router;
