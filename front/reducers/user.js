import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  id: null,
  pwd: null,
  nickname: "yuds",
  age: 100,
  isLoggedIn: false,
  isProcessing: false,
};

export const CHANGE_NICKNAME = "CHANGE_NICKNAME";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const changeNickname = (data) => {
  return {
    type: CHANGE_NICKNAME,
    data,
  };
};

// thunk 예제

export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(loginRequestAction());
    // axios
    //   .post("/api/login")
    //   .then(() => {
    //     dispatch(loginSuccessAction(data));
    //   })
    //   .catch(() => dispatch(loginFailureAction(data)));
  };
};

export const loginRequestAction = (data) => {
  return {
    type: LOGIN_REQUEST,
    data,
  };
};
export const loginSuccessAction = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};
export const loginFailureAction = (data) => {
  return {
    type: LOGIN_FAILURE,
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: LOGOUT_REQUEST,
    data,
  };
};
export const logoutSuccessAction = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data,
  };
};
export const logoutFailureAction = (data) => {
  return {
    type: LOGOUT_FAILURE,
    data,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action.payload);
      return { ...state, ...action.payload };

    case CHANGE_NICKNAME:
      return {
        ...state,
        name: action.data,
      };

    case LOGIN_REQUEST:
      return { ...state, isProcessing: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.data.id,
        pwd: action.data.pwd,
        isLoggedIn: true,
        isProcessing: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        id: action.data.id,
        pwd: action.data.pwd,
        isLoggedIn: false,
        isProcessing: false,
      };

    case LOGOUT_REQUEST:
      return { ...state, isProcessing: true };

    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false, isProcessing: false };

    case LOGOUT_FAILURE:
      return { ...state, isProcessing: false };

    default:
      return state;
  }
};

export default userReducer;
