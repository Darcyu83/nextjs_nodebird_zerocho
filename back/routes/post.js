const express = require("express");
const router = express.Router();
const { Post, Comment } = require("../models");

const { isLoggedIn } = require("./middlewares");
// 조회
router.get("/post", (req, res) => {
  res.json({ id: 1, content: "hello post json" });
});

// 등록 & 수정
router.post("/post", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    res.status(201).json(post);
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
    res.json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
