import axios from "axios";
import {
  delay,
  fork,
  put,
  takeLatest,
  all,
  call,
  throttle,
  take,
} from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_FAILURE,
  TOGGLE_LIKE_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function addPostAPI(params) {
  return axios.post(
    "/post",
    params
    //front : axios.default.withCredential true => 쿠키 전달
    //back : cors credentials true
  );
}

function deletePostAPI(params) {
  return axios.post(`/post/${params.id}/delete`, params);
}

function toggleLikedAPI(params) {
  return axios.patch(`/post/${params.id}/liked`, params);
  // unliked만 따로 구현할경우
  // return axios.delete(`/post/${params.id}/liked`);
}

function loadPostsAPI(params) {
  return axios.get(`/posts?lastId=${params?.lastId || 0}`);
}

function loadUserPostsAPI(params) {
  return axios.get(
    `/posts/user?userId=${params.id}&lastId=${params?.lastId || 0}`
  );
}
function loadHashtagPostsAPI(params) {
  return axios.get(
    `/hashtag/${encodeURIComponent(params.hashtag)}?lastId=${
      params?.lastId || 0
    }`
  );
}

function loadPostAPI(params) {
  return axios.get(`/post?postId=${params.id}`);
}

function addCommentAPI(params) {
  return axios.post(`/post/${params.postId}/comment`, params, {
    withCredentials: true,
  });
}

function uploadImagesAPI(params) {
  return axios.post("/post/images", params);
}

function retweetAPI(params) {
  return axios.post(`/post/${params.postId}/retweet`, params);
}

function* addPostFetch(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({ type: ADD_POST_SUCCESS, data: result.data });
    yield put({ type: ADD_POST_TO_ME, data: { postId: result.id } });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, error });
  }
}

function* addCommentFetch(action) {
  try {
    const result = yield call(addCommentAPI, action.data);

    yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: ADD_COMMENT_FAILURE, error });
  }
}

function* removePostFetch(action) {
  try {
    const result = yield call(deletePostAPI, action.data);

    yield put({ type: REMOVE_POST_SUCCESS, data: result.data });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (error) {
    yield put({ type: REMOVE_POST_FAILURE, error });
  }
}

function* loadPostsFetch(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_POSTS_FAILURE, error });
  }
}

function* loadPostFetch(action) {
  try {
    const result = yield call(loadPostAPI, action.data);

    yield put({ type: LOAD_POST_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_POST_FAILURE, error });
  }
}

function* toggleLikedFetch(action) {
  try {
    const result = yield call(toggleLikedAPI, action.data);

    console.log(" toggleLikedFetch === result ", result);
    yield put({ type: TOGGLE_LIKE_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: TOGGLE_LIKE_FAILURE, error });
  }
}
function* uploadImagesFetch(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({ type: UPLOAD_IMAGES_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: UPLOAD_IMAGES_FAILURE, error });
  }
}

function* retweetFetch(action) {
  try {
    const result = yield call(retweetAPI, action.data);

    yield put({ type: RETWEET_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: RETWEET_FAILURE, error });
  }
}

function* loadUserPostsFetch(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);

    yield put({ type: LOAD_USER_POSTS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_USER_POSTS_FAILURE, error });
  }
}

function* loadHashtagPostsFetch(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);

    yield put({ type: LOAD_HASHTAG_POSTS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_HASHTAG_POSTS_FAILURE, error });
  }
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPostFetch);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentFetch);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePostFetch);
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPostsFetch);
}

function* watchLoadUserPosts() {
  yield throttle(2000, LOAD_USER_POSTS_REQUEST, loadUserPostsFetch);
}
function* watchLoadHashtagPosts() {
  yield throttle(2000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPostsFetch);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPostFetch);
}

function* watchToggleLiked() {
  yield takeLatest(TOGGLE_LIKE_REQUEST, toggleLikedFetch);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImagesFetch);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweetFetch);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchToggleLiked),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
