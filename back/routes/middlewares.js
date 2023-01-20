// 로그아웃할때 로그인 되어있음
exports.isLoggedIn = (req, res, next) => {
  console.log(
    `\n\n\n[ isLoggedIn middleware ]::  req.user: `,
    `${JSON.stringify(req.user)}\n\n\n`
  );
  if (req.isAuthenticated()) {
    console.log("Login...ING " + "\n\n\n");
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

// 미들웨어 형태
// (req, res, next) => {}

// 로그인, 회원가입 할때 로그인 안되어있음
exports.isNotLoggedIn = (req, res, next) => {
  console.log(
    `\n\n\n[ isNotLoggedIn middleware ]::  req.user: `,
    `${JSON.stringify(req.user)}\n\n\n`
  );
  if (!req.isAuthenticated()) {
    console.log("Not Login..." + "\n\n\n");
    next(); //=> 다음 미들웨어로
    //next(error) => 에러 처리 미들웨어로 app.js
  } else {
    res.status(401).send("이미 로그인하였습니다.");
  }
};
