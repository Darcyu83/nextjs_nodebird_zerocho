const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require("passport");

const { User, Post } = require("../models");

// 유저 로그인/아웃 미들웨어
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
  console.log("\n\n\n\n\nreq.user", req.user);
  console.log("\n\n\n\n\nreq.headers", req.headers);
  try {
    if (!req.user) return res.status(200).json(null);

    const fullUserWithoutPwd = await User.findOne({
      where: { id: req.user.id },

      attributes: {
        include: ["id", "email", "nickname"],
        exclude: ["password"],
      },

      include: [
        { model: Post, attributes: ["id"] },
        { model: User, as: "Followings", attributes: ["id"] },
        { model: User, as: "Followers", attributes: ["id"] },
      ],
    });

    res.status(200).json(fullUserWithoutPwd);
  } catch (error) {
    console.log(`${req.url} :: error : `, error);
    next(error);
  }
});

router.get("/:userId/info", async (req, res, next) => {
  console.log("\n\n\n\n\nreq.user", req.user);
  console.log("\n\n\n\n\nreq.headers", req.headers);
  try {
    // if (!req.user) return res.status(200).json(null);

    const fullUserWithoutPwd = await User.findOne({
      where: { id: req.params.userId },

      attributes: {
        include: ["id", "email", "nickname"],
        exclude: ["password"],
      },

      include: [
        { model: Post, attributes: ["id"] },
        { model: User, as: "Followings", attributes: ["id"] },
        { model: User, as: "Followers", attributes: ["id"] },
      ],
    });
    if (!fullUserWithoutPwd)
      res.status(404).send("존재하지 않는 사용자입니다.");

    const data = fullUserWithoutPwd.toJSON();

    data.Posts = data.Posts.length;
    data.Followers = data.Followers.length;
    data.Followings = data.Followings.length;
    res.status(200).json(data);
  } catch (error) {
    console.log(`${req.url} :: error : `, error);
    next(error);
  }
});

/**
 * POST
 * /user/logout
 */
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy();
  req.logOut(() => {
    console.log("logout completed");
  });

  res.json({ result: "OK" });
});

/**
 * POST
 * /user/login
 */
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (serverErr, userData, info) => {
    if (serverErr) {
      console.log("serverErr", serverErr);
      return next(serverErr);
    }

    if (info) {
      // 400 Bad Request
      // 401 허가 안됨 : 비인증 : Unauthorized
      // 403 금지: 접근권리 없음 : Forbidden : 클라이언트를 식별하고 있음
      // 404 Not Found

      console.log("info", info);
      return res.status(401).send(info.reason);
    }

    //passport 실질적인 로그인 절차

    // req.login()실행과 동시에 serializeUser 실행됨

    // req.login()은 세션 키 생성 하고 쿠키에 세션키 설정해서 클라이언트로 보냄
    // setHeader('Cookie', key) 설정

    // serializeUser()는 세션 정보 저장
    // 세션 설정 : <임의의 키, user.id> 형식으로 저장함. serializeUser()

    return req.login(userData, async (loginErr) => {
      // passport 처리 에러
      if (loginErr) {
        console.log("loginErr", loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPwd = await User.findOne({
        where: { id: userData.id },

        attributes: {
          include: ["id", "email", "nickname"],
          exclude: ["password"],
        },

        include: [
          { model: Post },
          { model: User, as: "Followings", attributes: ["id"] },
          { model: User, as: "Followers", attributes: ["id"] },
        ],
      });

      return res.status(200).json(fullUserWithoutPwd);
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
      // 300 : 리다이렉트 or 캐싱
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

    res.status(201).json(user);
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});

// 닉네임 수정
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  await User.update(
    { nickname: req.body.nickname },
    { where: { id: req.user.id } }
  );

  res.status(200).json({ nickname: req.body.nickname });
});

router.patch("/:userId/follow", async (req, res, next) => {
  try {
    const id = req.params.userId;

    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(403).send("존재하지 않는 유저입니다.");

    user.addFollowers(req.body.id);

    res.status(200).json({ id: user.id, nickname: user.nickname });
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});

router.delete("/:userId/follow", async (req, res, next) => {
  try {
    const id = req.params.userId; // string
    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(403).send("존재하지 않는 유저입니다.");

    user.removeFollowers(req.body.id);

    res.status(200).json({ id: user.id, nickname: user.nickname });
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});

router.get("/:uerId/followings", isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({ where: { id: req.user.id } });

    const followings = me.getFollowings();

    res.status(200).json(followings);
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});
router.get("/:userId/followers", isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({ where: { id: req.user.id } });

    const followers = me.getFollowers();

    res.status(200).json(followers);
  } catch (error) {
    console.log("Create a User error:: ", error);
    next(error); // 한방에 에러 처리 핸들러 status 500
  }
});
module.exports = router;
