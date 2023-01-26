const express = require("express");
const { Op } = require("sequelize");
const router = express();

const { Post, User, Comment, Image } = require("../models");

// 조회
router.get("/", async (req, res, next) => {
  try {
    let where = {};

    //lastId값이 있을경우 = 초기 로딩이 아닌경우
    if (parseInt(req.query.lastId, 10)) {
      where = { id: { [Op.lt]: parseInt(req.query.lastId, 10) } }; // lastId 보다 작은
    }

    const posts = await Post.findAll({
      where,
      limit: 5,
      //   where: { id: { [Op.lt]: parseInt(req.query.lastId, 10) } },
      order: [
        ["createdAt", "DESC"], // 게시글 최신글 순

        [Comment, "createdAt", "DESC"], // 댓글 최신글 순
      ],

      //   offset: 0,
      //   offset: 10, // 11~20

      // 첫호출 후 2번째 호출 사이에 게시글이 추가/삭제 되는경우
      // 데이터가 꼬임
      // offset 대신 lastId를 사용

      include: [
        // {
        //   model: User, //게시글 작성자
        //   attributes: {
        //     include: ["id", "email", "nickname"],
        //     exclude: ["password"],
        //   },
        // },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },

        { model: Image },

        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },

        {
          model: User, // 종아요 누른사람 아이디s
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/user", async (req, res, next) => {
  const { userId, lastId } = req.query;

  console.log("\n\n\n  req.query \n\n\n   ", userId, lastId);
  try {
    let where = { UserId: parseInt(userId, 10) };
    const _lastId = parseInt(lastId, 10);
    if (_lastId) {
      where.id = { [Op.lt]: parseInt(lastId, 10) };
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).send("존재하지 않는 사용자입니다.");

    const posts = await Post.findAll({
      where,
      limit: 100,
      //   where: { id: { [Op.lt]: parseInt(req.query.lastId, 10) } },
      order: [
        ["createdAt", "DESC"], // 게시글 최신글 순

        [Comment, "createdAt", "DESC"], // 댓글 최신글 순
      ],

      //   offset: 0,
      //   offset: 10, // 11~20

      // 첫호출 후 2번째 호출 사이에 게시글이 추가/삭제 되는경우
      // 데이터가 꼬임
      // offset 대신 lastId를 사용

      include: [
        // {
        //   model: User, //게시글 작성자
        //   attributes: {
        //     include: ["id", "email", "nickname"],
        //     exclude: ["password"],
        //   },
        // },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
          // where: { id: parseInt(userId, 10) },
        },

        { model: Image },

        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },

        {
          model: User, // 종아요 누른사람 아이디s
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
          ],
        },
      ],
    });

    if (!posts)
      return res
        .status(404)
        .send("사용자가 작성한 게시글이 존재하지 않습니다.");

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = router;
