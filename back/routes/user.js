const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User } = require("../models");

/**
 * POST
 * /user/login
 */
router.post("/login", async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const hashedPwd = await bcrypt.hash(req.body.password, 12);

    console.log(
      "Login :: userData === ",
      userData.email,
      userData.password,
      "비번일치?",
      userData.password === hashedPwd
    );

    res;
  } catch (error) {}
});

/**
 * POST
 * /user
 */
router.post("/", async (req, res, next) => {
  try {
    const isUserExisting = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log("isUserExisting === ", isUserExisting);

    if (isUserExisting) {
      return res
        .status(403)
        .send({ isLoggedIn: true, result: "이미 사용중인 아이디입니다." });

      // 200 : 성공
      // 201 : 생성됨
      // 300 : 리다이렉트
      // 400 : 클라이언트 에러
      // 500 : 서버에러
    }

    const hashedPwd = await bcrypt.hash(req.body.password, 12); //해쉬 길이 10~13

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPwd,
    });

    res
      .status(201)
      .json({ isLoggedIn: true, result: "Created a User" + req.body.email });
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});

module.exports = router;
