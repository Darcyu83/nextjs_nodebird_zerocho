import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/forms/PostForm";
import AppLayout from "../components/layout/AppLayout";
import PostCardList from "../components/PostCardList";
import { LOAD_POSTS_REQUEST } from "../redux/reducers/post";
import { loadMyInfoAction } from "../redux/reducers/user";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // 로그인 상태 복구
  useEffect(() => {
    dispatch(loadMyInfoAction());
    dispatch({ type: LOAD_POSTS_REQUEST });
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

export default Home;
