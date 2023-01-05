const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, content: "hello post json" },
    { id: 2, content: "hello post json" },
    { id: 3, content: "hello post json" },
    { id: 4, content: "hello post json" },
  ]);
});

// 조회
router.get("/post", (req, res) => {
  res.json({ id: 1, content: "hello post json" });
});

// 등록 & 수정
router.post("/post", (req, res) => {
  res.json({ id: 1, content: "hello post json" });
});

// 삭제
router.delete("/post", (req, res) => {
  res.send("hello delete posts");
});

module.exports = router;
