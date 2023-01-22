const express = require("express");

const router = express();

const { Post, User, Comment, Image } = require("../models");

// 조회
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      //   where: { id: req.params.lastId },
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
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
