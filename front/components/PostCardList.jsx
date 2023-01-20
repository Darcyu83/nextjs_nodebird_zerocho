import { List } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../redux/reducers/post";
import PostCard from "./PostCard";

function PostCardList({ mainPosts }) {
  const { hasMorePosts, isProcessing } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY, // 스크롤 값
        document.documentElement.scrollHeight, // 전체 스크롤 높이
        document.documentElement.clientHeight // 사용자가 현재 보고 있는 화면의 높이
      );
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight * 0.6
      ) {
        if (hasMorePosts && !isProcessing) {
          dispatch({ type: LOAD_POSTS_REQUEST });
        }
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMorePosts, isProcessing]);

  return (
    <List>
      {mainPosts.map((post, idx) => (
        <List.Item key={"post_" + post.id + idx} style={{ marginTop: 20 }}>
          <PostCard post={post} />
        </List.Item>
      ))}
    </List>
  );
}

PostCardList.propTypes = {
  mainPosts: PropTypes.arrayOf(PropTypes.object),
};

export default PostCardList;
