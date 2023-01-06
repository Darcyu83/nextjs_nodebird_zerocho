// 1 ======================================================
// const http = require("http");

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models"); // db 연동

// passport 설정
const configurePassport = require("./passport");
configurePassport();

// Json으로 전달받은 값을 req 바디에 넣어줌
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: false }));
// form submit 데이터 타입 req 바디에 넣어줌
app.use(express.urlencoded({ extended: true }));

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
  console.log(req.url, req.method);

  res.send("hello express");
});
// 2 ======================================================

// 3 ======================================================
// server.listen(4000, () => {
//   console.log("서버 실행 중 port::4000");
// });

app.listen(5000, () => {
  console.log("서버 실행 중 port::4000");
});
// 3 ======================================================

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

app.use("/posts", postRouter); // 공통된 부분 앞으로 빼냄
app.use("/user", userRouter);
