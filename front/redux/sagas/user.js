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
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
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

const loadMyInfoAPI = () => {
  return axios.get("/user");
};

const changeNicknameAPI = (params) => {
  return axios.patch("/user/nickname", params);
};

const followAPI = (params) => {
  return axios.patch(`/user/${params.id}/follow`, params);
};

const unfollowAPI = (params) => {
  return axios.delete(`/user/${params.id}/follow`, params);
};

const loadFollowersAPI = (params) => {
  return axios.get(`/user/${params.id}/followers`);
};
const loadFollowingsAPI = (params) => {
  return axios.get(`/user/${params.id}/followings`);
};

const loadUserAPI = (params) => {
  return axios.get(`/user/${params.id}/info`);
};
function* loginFetch(action) {
  try {
    const result = yield call(loginAPI, action.data);

    console.log(
      `%c[ sagas/user.js ]:: loginFetch : `,
      "background-color: red; color: white;",
      result
    );

    yield put({ type: LOGIN_SUCCESS, data: result.data });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: LOGIN_FAILURE, error: error.response.data });
  }
}

function* logoutFetch(action) {
  try {
    const result = yield call(logoutAPI);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: LOGOUT_FAILURE, error: error.response.data });
  }
}

function* signupFetch(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log("sign up result === ", result);
    yield put({ type: SIGN_UP_SUCCESS, data: result.data });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: SIGN_UP_FAILURE, error: error.response.data });
  }
}

function* followFetch(action) {
  try {
    const result = yield call(followAPI, action.data);

    yield put({ type: FOLLOW_SUCCESS, data: result.data });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: FOLLOW_FAILURE, error: error.response.data });
  }
}
function* unfollowFetch(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({ type: UNFOLLOW_SUCCESS, data: result.data });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: UNFOLLOW_FAILURE, error: error.response.data });
  }
}

function* loadMyInfoFetch(action) {
  try {
    const result = yield call(loadMyInfoAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log("sagas/user.js error=== ", error);
    yield put({ type: LOAD_MY_INFO_FAILURE, error: error });
  }
}
function* changeNicknameFetch(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);

    yield put({ type: CHANGE_NICKNAME_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: CHANGE_NICKNAME_FAILURE, error: error.response.data });
  }
}

function* loadFollowersFetch(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);

    yield put({ type: LOAD_FOLLOWERS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_FOLLOWERS_FAILURE, error: error });
  }
}
function* loadFollowingsFetch(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);

    yield put({ type: LOAD_FOLLOWINGS_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_FOLLOWINGS_FAILURE, error: error });
  }
}

function* loadUserFetch(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({ type: LOAD_USER_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOAD_USER_FAILURE, data: error });
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

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfoFetch);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNicknameFetch);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowersFetch);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowingsFetch);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUserFetch);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadMyInfo),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchLoadUser),
  ]);
}
