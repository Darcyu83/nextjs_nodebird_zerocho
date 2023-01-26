import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/layout/AppLayout";
import PostCard from "../../components/PostCard";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POST_REQUEST,
} from "../../redux/reducers/post";
import wrapper from "../../redux/store/configureStore";

function Post({}) {
  const singlePost = useSelector((state) => state.post.singlePost);
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>

        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta
          property="og:url"
          content={`https://nodebird.com/post/${singlePost.id}`}
        />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
}

export default Post;

export const getServerSideProps = wrapper.getServerSideProps(async (_ctx) => {
  console.log("params and qeury", _ctx.params);
  console.log("params and qeury", _ctx.query);

  _ctx.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: { id: _ctx.params.id },
  });
  _ctx.store.dispatch(END);
  await _ctx.store.sagaTask.toPromise();
});
