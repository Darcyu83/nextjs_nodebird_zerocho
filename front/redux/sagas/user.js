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
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
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

const loginAPI = () => {
  //   return axios.post("/api/login");
};

function* loginFetch(action) {
  try {
    // const response = yield call(loginAPI, action.params);
    const response = yield delay(2000);

    yield put({ type: LOGIN_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error });
  }
}

function* logoutFetch(action) {
  try {
    yield delay(1000);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, error });
  }
}

function* signupFetch(action) {
  try {
    yield delay(1000);
    yield put({ type: SIGN_UP_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
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

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp)]);
}
