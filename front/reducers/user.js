import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  name: "yuds",
  age: 100,
  pwd: "sduy",
  isLoggedIn: false,
};

const CHANGE_NICKNAME = "CHANGE_NICKNAME";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const changeNickname = (data) => {
  return {
    type: CHANGE_NICKNAME,
    data: "hello yuds",
  };
};

export const loginAction = () => {
  return {
    type: LOGIN,
  };
};

export const logoutAction = () => {
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

    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default userReducer;
