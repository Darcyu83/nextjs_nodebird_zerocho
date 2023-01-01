import { all } from "axios";
import { fork, throttle } from "redux-saga/effects";

export function* watchAddPost() {
  yield throttle(
    "ADD_POST_REQUEST",
    () => {
      console.log("watchAddPost::ADD_POST_REQUEST");
    },
    2000
  );
  //   yield take("watchAddPost");
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
