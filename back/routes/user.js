const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require("passport");

const { User, Post } = require("../models");
const db = require("../models");

// 유저 로그인/아웃 미들웨어
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

/**
 * POST
 * /user/logout
 */
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logOut(() => {
    console.log("logout completed");
  });
  req.session.destroy();

  res.json({ result: "OK" });
});

/**
 * POST
 * /user/login
 */
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (serverErr, userData, clientErrorInfo) => {
    if (serverErr) {
      console.log("serverErr", serverErr);
      return next(serverErr);
    }

    if (clientErrorInfo) {
      // 400 Bad Request
      // 401 비인증 않음 : Unauthorized
      // 403 접근권리 없음 : Forbidden : 클라이언트를 식별하고 있음
      // 404 Not Found

      console.log("clientErrorInfo", clientErrorInfo);
      return res.status(401).send(clientErrorInfo.reason);
    }

    //passport 로그인 실질적인
    return req.login(userData, async (loginErr) => {
      if (loginErr) {
        console.log("loginErr", loginErr);
        return next(loginErr);
      }

      const user = await User.findOne({
        where: { id: userData.id },

        attributes: {
          include: ["id", "email", "nickname"],
          exclude: ["password"],
        },

        include: [
          { model: Post },
          { model: User, as: "Followings" },
          { model: User, as: "Followers" },
        ],
      });

      return res.status(200).json({ user });
    });
  })(req, res, next);
});

/**
 * POST
 * /user
 */
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const isUserExisting = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log("isUserExisting === ", isUserExisting);

    if (isUserExisting) {
      return res.status(403).send({ result: "이미 사용중인 아이디입니다." });

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

    const user = await User.findOne({
      where: { email: req.body.email },

      attributes: {
        include: ["id", "email", "nickname"],
        exclude: ["password"],
      },

      include: [
        { model: Post },
        { model: User, as: "Followings" },
        { model: User, as: "Followers" },
      ],
    });

    res.status(201).json({
      user,
      result: "Created a User" + req.body.email,
    });
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});

module.exports = router;
