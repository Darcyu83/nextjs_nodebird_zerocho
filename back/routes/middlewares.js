// 로그아웃할때 로그인 되어있음
exports.isLoggedIn = (req, res, next) => {


  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

// 미들웨어 형태
// (req, res, next) => {}

// 로그인, 회원가입 할때 로그인 안되어있음
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); //=> 다음 미들웨어로
    //next(error) => 에러 처리 미들웨어로 app.js
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};
