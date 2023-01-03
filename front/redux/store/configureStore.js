import { createWrapper } from "next-redux-wrapper";
import { legacy_createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
const customLoggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(
      "%c customLoggerMiddleware action:: ",
      "background-color: teal; color: white;",
      action
    );
    return next(action);
  };

const configureStoreAsStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, customLoggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = legacy_createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(configureStoreAsStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;

// 프로젝트 규모가 있다 : 중앙 저장소 필요함.
// 리덕스 초급 / Mobx 중급
