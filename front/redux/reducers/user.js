import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  me: {
    id: null,
    pwd: null,
    nickname: null,
    age: null,
    posts: null,
    followings: null,
    followers: null,
  },

  isSignedUp: false,
  isLoggedIn: false,
  isLoggedOut: false,
  isErrorOccured: false,
  error: null,
  isProcessing: false,
};

const dummyUser = (action) => ({
  id: action.data.email,
  pwd: action.data.pwd,
  nickname: "yuds",
  age: 100,
  posts: [],
  followings: [],
  followers: [],
});
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

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
export const loginFailureAction = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
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
export const logoutFailureAction = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
};

export const signupRequestAction = (data) => {
  return {
    type: LOGOUT_REQUEST,
    data,
  };
};
export const signupSuccessAction = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data,
  };
};
export const signupFailureAction = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error,
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

    case SIGN_UP_REQUEST:
      return {
        ...state,
        isProcessing: true,
        isErrorOccured: false,
        error: null,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        me: { ...dummyUser(action) },
        isLoggedIn: false,
        isProcessing: false,
        isSignedUp: true,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isErrorOccured: true,
        error: action.error,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isProcessing: true,
        isErrorOccured: false,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,

        me: { ...dummyUser(action) },

        isLoggedIn: true,
        isProcessing: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isProcessing: false,
        isErrorOccured: true,
        error: action.error,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isProcessing: true,
        isErrorOccured: false,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        me: initialState.me,
        isLoggedIn: false,
        isProcessing: false,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isErrorOccured: true,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
