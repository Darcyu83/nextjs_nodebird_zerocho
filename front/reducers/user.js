import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  id: null,
  pwd: null,
  nickname: "yuds",
  age: 100,
  isLoggedIn: false,
};

const CHANGE_NICKNAME = "CHANGE_NICKNAME";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

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
    axios
      .post("/api/login")
      .then(() => {
        dispatch(loginSuccessAction(data));
      })
      .catch(() => dispatch(loginFailureAction(data)));
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

export const logoutRequestAction = () => {
  return {
    type: LOGOUT,
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
      return {
        ...state,
        id: action.data.id,
        pwd: action.data.pwd,
        isLoggedIn: true,
      };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default userReducer;
