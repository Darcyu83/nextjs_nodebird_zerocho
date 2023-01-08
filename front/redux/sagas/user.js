import {
  all,
  fork,
  call,
  put,
  take,
  takeLatest,
  takeEvery,
  takeLeading,
  takeMaybe,
  throttle,
  debounce,
  delay,
} from "redux-saga/effects";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";

import axios from "axios";
/*
 all([함수,함수들]) : 함수들을 동시에 실행한다.
 fork(함수) : 비동기 함수를 실행한다.(non-blocking)
 call(api 함수) : 동기 함수 호출 (blocking) (asynchronous -> synchronous)

 take : 1회성 동작 


1-1 while take 문 : 동기적으로 동작 (blocking)
    while(true){
        yield take("ACTION_", loginFetch)
    }


1-2-1 takeEvery : 비동기적으로 동작(non-blocking)
    yield takeEvery("ACTION_", loginFetc)

1-2-2 takeLeading : 첫 요청만 실행
  
 
1-3-1 throttle (scrolling) : 일정시간 내에 재 호출되지 않음 
    yield throttle("ACTION_", loginFetch, 2000)

1-3-2 debounce( text 완성 시점에 요청 ) : 연속된 호출 중 맨처음 혹은 맨마지막 호출을 실행

1-4 takeLatest : 마지막 요청을 실행 (요청은 2번 들어가도 -> 응답은 2번 중 1번을 취소한다의 의미)
    server 쪽에서 중복값 체크 

*/

const loginAPI = (params) => {
  console.log("axios check ", axios);
  return axios.post("/user/login", params);
};
const logoutAPI = (params) => {
  return axios.post("/user/logout", params);
};

const signupAPI = (params) => {
  return axios.post("/user", params);
};

function* loginFetch(action) {
  try {
    const result = yield call(loginAPI, action.data);

    yield put({ type: LOGIN_SUCCESS, data: result.data.user });
  } catch (error) {
    console.log("error=== ", error);
    yield put({ type: LOGIN_FAILURE, error: error.message });
  }
}

function* logoutFetch(action) {
  try {
    const result = yield call(logoutAPI);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log("error=== ", error);
    yield put({ type: LOGOUT_FAILURE, error: error.message });
  }
}

function* signupFetch(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log("sign up result === ", result);
    yield put({ type: SIGN_UP_SUCCESS, data: result.data.user });
  } catch (error) {
    console.log("error=== ", error);
    yield put({ type: SIGN_UP_FAILURE, error: error.message });
  }
}

function* followFetch(action) {
  try {
    yield delay(1000);

    yield put({ type: FOLLOW_SUCCESS, data: { nickname: action.data } });
  } catch (error) {
    console.log("error=== ", error);
    yield put({ type: FOLLOW_FAILURE, error: error.message });
  }
}
function* unfollowFetch(action) {
  try {
    yield delay(1000);

    yield put({ type: UNFOLLOW_SUCCESS, data: { nickname: action.data } });
  } catch (error) {
    console.log("error=== ", error);
    yield put({ type: UNFOLLOW_FAILURE, error: error.message });
  }
}

function* watchLogin() {
  //   while (true) {
  //     yield take(LOGIN_REQUEST, loginFetch);
  //   }
  yield takeLatest(LOGIN_REQUEST, loginFetch);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutFetch);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signupFetch);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, followFetch);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollowFetch);
}
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
