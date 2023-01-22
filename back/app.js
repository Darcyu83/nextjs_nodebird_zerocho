// 1 ======================================================
// const http = require("http");

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
//환경변수 설정
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./models"); // db 연동

//app.use 는 미들웨어 설정들

// passport 설정
const configurePassport = require("./passport");
configurePassport();

// Json으로 전달받은 값을 req.body 에 넣어줌
app.use(express.json());

// form submit 데이터 타입 req.body 에 넣어줌
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//credentials : 쿠키 전달하고 싶을때
//front : axios.default.withCredential true => 쿠키 전달
//back : cors credentials true
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Cookie 미들웨어 사용
app.use(cookieParser(process.env.COOKIE_SECRET));

// Session 미들웨어 사용
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // cookie sessionKey생성시 사용
    cookie: {
      maxAge: 1000 * 60 * 5,
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

app.use("/post", postRouter); // 공통된 부분 앞으로 빼냄
app.use("/posts", postsRouter); // 공통된 부분 앞으로 빼냄
app.use("/user", userRouter);

// 에러처리 미들웨어 (내장형으로 명시할 필요 없음)
// => 특별하게처리 할때 구현
app.use((err, req, res, next) => {});

// 3 ======================================================
// server.listen(4000, () => {
//   console.log("서버 실행 중 port::4000");
// });

app.listen(5000, () => {
  console.log("서버 실행 중 port::4000");
});
// 3 ======================================================
