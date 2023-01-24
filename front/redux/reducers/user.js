import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  me: null,
  userInfo: null,
  // me: {
  //   id: null,
  //   password: null,
  //   nickname: null,
  //   Posts: [],
  //   Followings: [],
  //   Followers: [],
  // },

  isSignedUp: false,
  isLoggedOut: false,
  isErrorOccured: false,
  error: null,
  isProcessing: false,
};

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

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

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

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
    type: CHANGE_NICKNAME_REQUEST,
    data,
  };
};
export const changeNicknameSuccessAction = (data) => {
  return {
    type: CHANGE_NICKNAME_SUCCESS,
    data,
  };
};
export const changeNicknameFailureAction = (error) => {
  return {
    type: CHANGE_NICKNAME_FAILURE,
    error,
  };
};

export const loadMyInfoAction = () => {
  return { type: LOAD_MY_INFO_REQUEST };
};

export const loadFollowersRequestAction = (data) => {
  return { type: LOAD_FOLLOWERS_REQUEST, data };
};
export const loadFollowingsRequestAction = (data) => {
  return { type: LOAD_FOLLOWINGS_REQUEST, data };
};

// Immer 적용
const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // case HYDRATE:
      //   return { ...state, ...action.payload };

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
          me: action.data,
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
          me: action.data,
          isProcessing: false,
          isSignedUp: true,
        };

      case LOGIN_FAILURE:
        return {
          ...state,
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
          // me: initialState.me,
          me: null,
          isProcessing: false,
        };

      case LOGOUT_FAILURE:
        return {
          ...state,
          me: null,
          isProcessing: false,
          // isErrorOccured: true,
          // error: action.error,
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
          me: { ...state.me, Posts: [action.data.PostId, ...state.me.Posts] },
        };

      case REMOVE_POST_OF_ME:
        return {
          ...state,
          me: {
            ...state.me,
            Posts: state.me.Posts.filter(
              (post) => post.id !== action.data.PostId
            ),
          },
        };

      case FOLLOW_REQUEST:
        draft.isProcessing = true;
        break;

      case FOLLOW_SUCCESS:
        draft.isProcessing = false;

        draft.me.Followings = draft.me.Followings.concat(action.data);
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
        draft.me.Followings = draft.me.Followings.filter(
          (obj) => obj.id !== action.data.id
        );
        break;

      case UNFOLLOW_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;

        break;

      case LOAD_FOLLOWINGS_REQUEST:
        draft.isProcessing = true;
        break;

      case LOAD_FOLLOWINGS_SUCCESS:
        draft.isProcessing = false;
        draft.me.Followings = draft.me.Followings.push(action.data);
        break;

      case LOAD_FOLLOWINGS_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;

        break;

      case LOAD_FOLLOWERS_REQUEST:
        draft.isProcessing = true;
        break;

      case LOAD_FOLLOWERS_SUCCESS:
        draft.isProcessing = false;
        draft.me.Followings = draft.me.Followers.push(action.data);
        break;

      case LOAD_FOLLOWERS_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;

        break;

      case LOAD_MY_INFO_REQUEST:
        draft.isProcessing = true;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.me = action.data;
        draft.isProcessing = false;
        draft.isErrorOccured = false;
        draft.error = null;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.isProcessing = true;
        break;

      case LOAD_USER_SUCCESS:
        draft.userInfo = action.data;
        draft.isProcessing = false;
        draft.isErrorOccured = false;
        draft.error = null;
        break;

      case LOAD_USER_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });

export default userReducer;
