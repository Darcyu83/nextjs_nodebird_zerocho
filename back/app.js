// 1 ======================================================
// const http = require("http");

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
//환경변수 설정
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./models"); // db 연동
const path = require("path");
//app.use 는 미들웨어 설정들

// passport 설정
const configurePassport = require("./passport");
configurePassport();

const isProdMode = process.env.NODE_ENV === "production";
app.set("port", isProdMode ? 80 : 5000);

if (isProdMode) {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());

  // Nginx 적용 및 cookie secure 옵션 추가
  app.set("trust proxy", "1");
} else {
  app.use(morgan("dev"));
}

const PORT = app.get("port");
// 업로드 폴더
// "/" === localhost:port
app.use("/", express.static(path.join(__dirname, "uploads")));

// Json으로 전달받은 값을 req.body 에 넣어줌
// axios의 파라미터 {}
app.use(express.json());

// form submit 데이터 타입 req.body 에 넣어줌
// 일반 <form></form>으로 데이터 넘겨올때
app.use(express.urlencoded({ extended: true }));

//credentials : 쿠키 전달하고 싶을때
//front : axios.default.withCredential true => 쿠키 전달
//back : cors credentials true
app.use(
  cors({
    origin: ["http://localhost:3000", "nodebird.com", "http://43.200.190.178"],
    credentials: true,
  })
);

// Cookie 미들웨어 사용
app.use(cookieParser(process.env.COOKIE_SECRET));

// Session 미들웨어 사용

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // cookie sessionKey생성시 사용
    // Nginx 적용 및 cookie secure true 옵션 추가
    // 없으면 로그인 유지 안됨;
    proxy: isProdMode,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      // Nginx 적용 및 cookie secure true 옵션 추가
      // 없으면 로그인 유지 안됨;
      secure: isProdMode, //https 사용할경우 true + production
      domain: isProdMode ? "http://43.200.190.178" : "http://localhost:3000",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

db.sequelize
  .sync()
  .then(() => console.log("db 연결 성공"))
  .catch(console.error);

// 1 ======================================================

// 2 ======================================================
// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);

//   res.write(`<h1>"start: hello node 1"</h1>`);
//   res.write('<h2>"start: hello node 2"</h2>');
//   res.write('<h3>"start: hello node 3"</h3>');
//   res.write('<h4>"start: hello node 4"</h4>');

//   res.end("end: hello node");
// });

app.get("/", (req, res) => {
  console.log("\n", req.url, req.method);
  console.log("\n", req.isAuthenticated());

  res.send("hello express");
});
// 2 ======================================================

/**
 *
 * 자주 쓰는
 * app.get  -> 조회
 * app.post -> 생성
 * app.put -> 전체 수정 : 통째로 덮어 씌우는거
 * app.patch -> 부분 수정 : 닉네임 한포인트 수정
 * app.delete -> 삭제
 * app.options -> 찔러보기 : 서버 응답 여부 체크
 * app.head -> 헤더만 가져오기(헤더 / 바디)
 *
 * */

app.get("/api", (req, res) => {
  res.json({ id: 1, content: "hello post json" });
});

// 조회
app.get("/api/posts", (req, res) => {
  res.send("hello posts");
});
// 등록 & 수정
app.post("/api/post", (req, res) => {
  res.json({ id: 1, content: "hello post json" });
});

// 삭제
app.delete("/api/post", (req, res) => {
  res.send("hello delete posts");
});

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");

app.use("/post", postRouter); // 공통된 부분 앞으로 빼냄
app.use("/posts", postsRouter); // 공통된 부분 앞으로 빼냄
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

// 에러처리 미들웨어 (내장형으로 명시할 필요 없음)
// => 특별하게처리 할때 구현
app.use((err, req, res, next) => {});

// 3 ======================================================
// server.listen(4000, () => {
//   console.log("서버 실행 중 port::4000");
// });

app.listen(PORT, () => {
  console.log(
    `서버 실행 중 port::${PORT}\n\n`,
    `process.env.NODE_ENV = ${process.env.NODE_ENV}`
  );
});
// 3 ======================================================
