const passport = require("passport");
const { User } = require("../models");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const local = () => {
  passport.use(
    new LocalStrategy(
      // req.body.email , req.body,password 변수명 동일하게
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          // user있으면 유저정보 obj 없으면 null
          const user = await User.findOne({
            where: {
              email,
            },
          });

        
          if (!user) {
            // 서버 에러 null , 성공여부 false, 클라이언트 에러 : reason
            return done(null, false, {
              reason: "존재하지 않는 사용자입니다.",
            });
          }

          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              reason: "비밀번호가 일치하지 않습니다. ",
            });
          }

          //정상 처리
          return done(null, user);
        } catch (error) {
          console.log("login server side error=== ", error);
          return done(error);
        }
      }
    )
  );
};
module.exports = local;
