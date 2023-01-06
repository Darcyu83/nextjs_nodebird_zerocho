const passport = require("passport");

const { Strategy: LocalStrategy } = require("passport-local");

module.eports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      () => {}
    )
  );
};
