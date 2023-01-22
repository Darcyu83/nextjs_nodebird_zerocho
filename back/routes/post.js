const express = require("express");
const router = express.Router();
const { Post, Comment, User, Image } = require("../models");

const { isLoggedIn } = require("./middlewares");

// 등록 & 수정
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
      include: [{ model: Image }, { model: Comment }, { model: User }],
    });

    console.log(fullPost);

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 삭제
router.delete("/", isLoggedIn, (req, res) => {
  res.send("hello delete posts");
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

module.exports = router;
