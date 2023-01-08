const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

// 세션 설정
module.exports = () => {
  //session <임의의 키 , userId>
  passport.serializeUser((user, done) => {
    // done(serverError, isSuccessbool, clientError )

    console.log(`\n\nserializeUser\n\n${JSON.stringify(user)}\n\n\n\n`);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log(`\n\ndeserializeUser\n\n${JSON.stringify(user)}\n\n\n\n`);
      done(err, user);
    });
  });

  local();
};
