import { List } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import PostCard from "../../components/PostCard";
import { LOAD_USER_POSTS_REQUEST } from "../../redux/reducers/post";
import wrapper from "../../redux/store/configureStore";

function UserPosts({}) {
  const dispatch = useDispatch();

  const { mainPosts, hasMorePosts, isProcessing } = useSelector(
    (state) => state.post
  );

  const router = useRouter();
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
          const lastId = mainPosts[mainPostslength - 1]?.id;

          dispatch({
            type: LOAD_USER_POSTS_REQUEST,

            data: { lastId, id: router.query.id },
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMorePosts, isProcessing, mainPosts]);

  return (
    <List>
      {mainPosts.length !== 0 &&
        mainPosts.map((post, idx) => {
          console.log("mainposts === , post === ", mainPosts, post);

          return (
            <List.Item key={"post_" + post.id + idx} style={{ marginTop: 20 }}>
              <PostCard post={post} />
            </List.Item>
          );
        })}
    </List>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (_ctx) => {
  _ctx.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,

    data: { lastId: 0, id: _ctx.params.id },
  });

  _ctx.store.dispatch(END);
  await _ctx.store.sagaTask.toPromise();
});
export default UserPosts;
