import { useSelector } from "react-redux";
import PostForm from "../components/forms/PostForm";
import AppLayout from "../components/layout/AppLayout";
import PostCardList from "../components/PostCardList";

const Home = () => {
  const user = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {/* 포스트 등록 폼 */}
      {user.isLoggedIn && <PostForm />}

      {/* 포스트 목록 */}
      <PostCardList mainPosts={mainPosts} />
    </AppLayout>
  );
};

export default Home;
