import axios from "axios";
import {
  delay,
  fork,
  put,
  takeLatest,
  all,
  call,
  throttle,
} from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  dummyPost,
  generateDummyPostData,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function addPostAPI(params) {
  return axios.post(
    "/posts/post",
    params
    //front : axios.default.withCredential true => 쿠키 전달
    //back : cors credentials true
  );
}

function loadPostsAPI() {
  return axios.get("/posts");
}

function addCommentAPI(params) {
  return axios.post(`/posts/post/${params.postId}/comment`, params, {
    withCredentials: true,
  });
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
    yield delay(1000);
    yield put({ type: REMOVE_POST_SUCCESS, data: action.data });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: { postId: action.data.id },
    });
  } catch (error) {
    yield put({ type: REMOVE_POST_FAILURE, error });
  }
}

function* loadPostFetch(action) {
  try {
    const result = yield call(loadPostsAPI);
    yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_POSTS_FAILURE, error });
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

function* watchLoadPost() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPostFetch);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
