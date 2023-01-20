const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

// 세션 설정
module.exports = () => {
  //session <임의의 키 , userId>
  passport.serializeUser((user, done) => {
    // done(serverError, isSuccessbool, clientError )

    console.log(`\n\nserializeUser\n\n${JSON.stringify(user)}\n\n\n\n`);

    // serializeUser()는 세션 정보 저장
    // 여기서 세션 설정 : <sessionKey, user.id> 형식으로 저장함.
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });

      done(null, user); // req.user에 값을 넣어줌 => 로그아웃 하기전에 req.user 정보 조회하면 값이 들어있음.
    } catch (error) {
      console.log(`[ passport/index.js ]::  : `);
      done(error);
    }
  });

  local();
};
