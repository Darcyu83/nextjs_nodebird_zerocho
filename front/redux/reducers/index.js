import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import postReducer from "./post";
import userReducer from "./user";

// const rootReducer = combineReducers({

// });
// const rootReducer = combineReducers({
//   // HYYDRATE 적용을 위해서 추가 :  서버사이트 렌더링 위해서
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         return { ...state, ...action.payload };
//       default:
//         return state;
//     }
//   },
//   user: userReducer,
//   post: postReducer,
// });

//  const combinedReducer = combineReducers({
//   user: userReducer,
//   post: postReducer,
// });

// 위를 확장 가능하게 만들기 위해
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      const combinedReducer = combineReducers({
        user: userReducer,
        post: postReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;
