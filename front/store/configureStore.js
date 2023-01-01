import { createWrapper } from "next-redux-wrapper";
import { legacy_createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const customLoggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log("customLoggerMiddleware action:: ", action);
    return next(action);
  };
const configureStoreAsStore = () => {
  const middlewares = [thunkMiddleware, customLoggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = legacy_createStore(rootReducer, enhancer);

  return store;
};

const wrapper = createWrapper(configureStoreAsStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;

// 프로젝트 규모가 있다 : 중앙 저장소 필요함.
// 리덕스 초급 / Mobx 중급
