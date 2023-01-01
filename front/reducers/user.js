import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  id: null,
  pwd: null,
  nickname: "yuds",
  age: 100,
  isLoggedIn: false,
};

const CHANGE_NICKNAME = "CHANGE_NICKNAME";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const changeNickname = (data) => {
  return {
    type: CHANGE_NICKNAME,
    data,
  };
};

export const loginAction = (data) => {
  return {
    type: LOGIN,
    data,
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
