import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import PostForm from "../components/forms/PostForm";
import AppLayout from "../components/layout/AppLayout";
import PostCardList from "../components/PostCardList";
import { LOAD_POSTS_REQUEST } from "../redux/reducers/post";
import { loadMyInfoAction } from "../redux/reducers/user";
import wrapper from "../redux/store/configureStore";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // 로그인 상태 복구
  // useEffect(() => {
  //   dispatch(loadMyInfoAction());
  //   dispatch({ type: LOAD_POSTS_REQUEST, lastId: undefined });
  // }, []);

  useEffect(() => {
    console.log(`\n\n
    process.env.NODE_ENV=${process.env.NODE_ENV}
    axios.defaults.baseURL=${axios.defaults.baseURL}
    \n\n`);
  }, []);
  return (
    <AppLayout>
      {/* 포스트 등록 폼 */}
      {me && <PostForm />}

      {/* 포스트 목록 */}
      <PostCardList />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (_ctx) => {
  console.log("\n\n\n  _ctx.req.headers  \n\n\n", _ctx.req.headers);

  // 프론트 서버 에서 백엔드 서버로 요청할때 쿠키
  // 브라우저가 개입할수 없기 때문에 쿠키정보가 없다.
  // 아래와 같이 처리한다.
  const cookie = _ctx.req ? _ctx.req.headers.cookie : null;
  axios.defaults.headers.Cookie = ""; // 쿠키 초기화 : 전사람 로그인 쿠키 초기화

  if (_ctx.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  axios.defaults.headers.Cookie = cookie;
  _ctx.store.dispatch(loadMyInfoAction());
  _ctx.store.dispatch({ type: LOAD_POSTS_REQUEST, lastId: 0 });
  _ctx.store.dispatch(END);
  await _ctx.store.sagaTask.toPromise();
});
export default Home;
