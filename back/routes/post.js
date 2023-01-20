const express = require("express");
const router = express.Router();
const { Post, Comment, User } = require("../models");

const { isLoggedIn } = require("./middlewares");
// 조회
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 등록 & 수정
router.post("/post", isLoggedIn, async (req, res, next) => {
  console.log(`[ post.js ]::  : `, req.body);

  try {
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{ model: Image }, { model: Comment }, { model: User }],
    });

    // 리턴해야하는 데이터 형태
    // const beReturned = {
    //   id: 0 ,
    //   user: {id: '', nickname:''},
    //   content: '',
    //   images: [],
    //   comments: [],
    // };

    console.log(fullPost);

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 삭제
router.delete("/post", isLoggedIn, (req, res) => {
  res.send("hello delete posts");
});

// 코멘트 등록 & 수정
router.post("/post/:postId/comment", isLoggedIn, async (req, res, next) => {
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

    const beReturned = {
      user: { id: comment.UserId, nickname: req.user.nickname },
      id: comment.id,
      postId: comment.PostId,
      content: comment.content,
    };

    res.status(201).json(beReturned);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
