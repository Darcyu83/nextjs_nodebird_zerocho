const express = require("express");
const router = express.Router();
const { Post, Hashtag, User, Comment, Image } = require("../models");
router.get("/:hashtag", async (req, res, next) => {
  try {
    const posts = Post.findAll({
      where: { hashtag: req.params.hashtag },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Hashtag, where: { name: req.params.hashtag } },
        {
          model: User,
          attributes: ["id", "nickname"],
          order: [["createdAt", "DESC"]],
        },
        { model: Image },
        { model: Comment },
        { model: User, as: "LIkers", attributes: ["id"] },
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

module.exports = router;
