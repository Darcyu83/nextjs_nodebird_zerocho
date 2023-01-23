import { List } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../redux/reducers/post";
import PostCard from "./PostCard";

function PostCardList({}) {
  const { hasMorePosts, isProcessing, error } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  const { mainPosts } = useSelector((state) => state.post);

  // useEffect(() => {
  //   if (error) return alert(error.data);
  // }, [error]);

  // index.js 에서 로딩함.
  // useEffect(() => { XXX
  //   dispatch({ type: LOAD_POSTS_REQUEST, lastId: undefined });
  // }, []);

  useEffect(() => {
    function onScroll() {
      // console.log(
      //   window.scrollY, // 스크롤 값
      //   document.documentElement.scrollHeight, // 전체 스크롤 높이
      //   document.documentElement.clientHeight // 사용자가 현재 보고 있는 화면의 높이
      // );

      console.log(
        `%c[ PostCardList.jsx ]::  hasMorePosts && !isProcessing: `,
        "background-color: orange; color: white;",
        hasMorePosts
      );

      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight * 0.6
      ) {
        if (hasMorePosts && !isProcessing) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;

          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: { lastId },
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMorePosts, isProcessing, mainPosts]);

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
