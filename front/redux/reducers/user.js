import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  me: {
    id: null,
    password: null,
    nickname: null,

    posts: [],
    followings: [],
    followers: [],
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
  password: action.data.password,
  nickname: "yuds",
  age: 100,
  posts: [{ id: "1" }],
  followings: [
    { nickname: "person 1" },
    { nickname: "person 2" },
    { nickname: "person 3" },
  ],
  followers: [
    { nickname: "follower 1" },
    { nickname: "follower 2" },
    { nickname: "follower 3" },
  ],
});

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAMEREQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAMESUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAMEFAILURE";

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

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

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
    type: SIGN_UP_REQUEST,
    data,
  };
};
export const signupSuccessAction = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};
export const signupFailureAction = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    error,
  };
};

export const unfollowRequestAction = (data) => {
  return {
    type: UNFOLLOW_REQUEST,
    data,
  };
};
export const unfollowSuccessAction = (data) => {
  return {
    type: UNFOLLOW_SUCCESS,
    data,
  };
};
export const unfollowFailureAction = (error) => {
  return {
    type: UNFOLLOW_FAILURE,
    error,
  };
};

export const followRequestAction = (data) => {
  return {
    type: FOLLOW_REQUEST,
    data,
  };
};
export const followSuccessAction = (data) => {
  return {
    type: FOLLOW_SUCCESS,
    data,
  };
};
export const followFailureAction = (error) => {
  return {
    type: FOLLOW_FAILURE,
    error,
  };
};

export const changeNicknameRequestAction = (data) => {
  return {
    type: LOGOUT_REQUEST,
    data,
  };
};
export const changeNicknameSuccessAction = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data,
  };
};
export const changeNicknameFailureAction = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
};

// Immer 적용
const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      case SIGN_UP_REQUEST:
        return {
          ...state,
          isProcessing: true,
          isErrorOccured: false,
          error: null,
          isSignedUp: false,
        };

      case SIGN_UP_SUCCESS:
        return {
          ...state,
          me: { ...state.me, ...action.data },
          isLoggedIn: true,
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
          me: { ...state.me, ...action.data },
          isLoggedIn: true,
          isProcessing: false,
          isSignedUp: true,
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

      case CHANGE_NICKNAME_REQUEST:
        return {
          ...state,
          isProcessing: true,
          isErrorOccured: false,
          error: null,
        };

      case CHANGE_NICKNAME_SUCCESS:
        return {
          ...state,
          me: { ...state.me, nickname: action.data.nickname },
          isLoggedIn: false,
          isProcessing: false,
        };

      case CHANGE_NICKNAME_FAILURE:
        return {
          ...state,
          isProcessing: false,
          isErrorOccured: true,
          error: action.error,
        };

      case ADD_POST_TO_ME:
        return {
          ...state,
          me: { ...state.me, posts: [action.data.postId, ...state.me.posts] },
        };

      case REMOVE_POST_OF_ME:
        return {
          ...state,
          me: {
            ...state.me,
            posts: state.me.posts.filter(
              (post) => post.id !== action.data.postId
            ),
          },
        };

      case FOLLOW_REQUEST:
        draft.isProcessing = true;
        break;

      case FOLLOW_SUCCESS:
        draft.isProcessing = false;

        draft.me.followings = draft.me.followings.concat(action.data);
        break;

      case FOLLOW_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.isProcessing = true;
        break;

      case UNFOLLOW_SUCCESS:
        draft.isProcessing = false;
        draft.me.followings = draft.me.followings.filter(
          (obj) => obj.nickname !== action.data.nickname
        );
        break;

      case UNFOLLOW_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;

        break;
      default:
        return state;
    }
  });

export default userReducer;
