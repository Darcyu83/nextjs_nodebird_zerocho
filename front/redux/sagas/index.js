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

import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";
import { backUrl } from "../../config/config";
import axios from "axios";

axios.defaults.baseURL = backUrl;
// cors : 이슈 해결
// 다른 도메인에서 호출시 쿠키 전달안되서 로그인해도 오류가 발생
// localhost:3000 request
// localhost:5000 response 401 에러 unauthorized

// front:
// axios.defaults.withCredentials = true;

// backend :
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
