import { all } from "axios";
import { delay, fork, put, throttle } from "redux-saga/effects";
import { ADD_POST_FAILURE, ADD_POST_SUCCESS } from "../reducers/post";

function* addPostSaga(action) {
  try {
    yield delay(1000);
    yield put({ type: ADD_POST_SUCCESS });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, error });
  }
}

function* watchAddPost() {
  yield throttle(ADD_POST_SUCCESS, addPostSaga, 2000);
  //   yield take("watchAddPost");
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
