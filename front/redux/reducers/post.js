import { HYDRATE } from "next-redux-wrapper";
import produce from "immer";

export const initialState = {
  mainPosts: [],
  hasMorePosts: true,
  imagePaths: [],
  isProcessing: false,
  isAddPostDone: false,
  isAddCommentDone: false,
  isRemovePostDone: false,
  isRemoveCommentDone: false,
  isErrorOccured: false,
  error: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const TOGGLE_LIKE_REQUEST = "TOGGLE_LIKE_REQUEST";
export const TOGGLE_LIKE_SUCCESS = "TOGGLE_LIKE_SUCCESS";
export const TOGGLE_LIKE_FAILURE = "TOGGLE_LIKE_FAILURE";

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};
export const addPostSuccessAction = (data) => {
  return {
    type: ADD_POST_SUCCESS,
    data,
  };
};
export const addPostFailureAction = (data) => {
  return {
    type: ADD_POST_FAILURE,
    data,
  };
};
export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};
export const addCommentSuccessAction = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    data,
  };
};
export const addCommentFailureAction = (data) => {
  return {
    type: ADD_COMMENT_FAILURE,
    data,
  };
};

export const toggleLikeRequestAction = (data) => {
  return { type: TOGGLE_LIKE_REQUEST, data };
};

const postReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      case ADD_POST_REQUEST:
        draft.isProcessing = true;
        draft.isAddPostDone = false;
        draft.isErrorOccured = false;
        draft.error = null;
        break;
      // return {
      //   ...state,
      //   isProcessing: true,
      //   isAddPostDone: false,
      //   isErrorOccured: false,
      //   error: null,
      // };

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.isAddPostDone = true;
        draft.isProcessing = false;
        break;
      // return {
      //   ...state,
      //   mainPosts: [action.data, ...state.mainPosts],
      //   isAddPostDone: true,
      //   isProcessing: false,
      // };
      case ADD_POST_FAILURE:
        draft.isProcessing = false;
        draft.isAddPostDone = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;
      // return {
      //   ...state,
      //   isProcessing: false,
      //   isAddPostDone: false,
      //   isErrorOccured: true,
      //   error: action.error,
      // };

      case ADD_COMMENT_REQUEST:
        draft.isProcessing = true;
        draft.isAddCommentDone = false;
        draft.isErrorOccured = false;
        draft.error = null;
        break;
      // return {
      //   ...state,
      //   isProcessing: true,
      //   isAddCommentDone: false,
      //   isErrorOccured: false,
      //   error: null,
      // };
      case ADD_COMMENT_SUCCESS:
        // 코멘트 추가할 원글 찾기
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );

        // 맨앞으로 추가
        post.Comments.unshift(action.data);
        draft.isAddCommentDone = true;
        draft.isProcessing = false;
        break;

      // const targetIdx = state.mainPosts.findIndex(
      //   (post) => post.id === action.data.postId
      // );

      // const mainPosts = state.mainPosts;
      // mainPosts[targetIdx].Comments = [
      //   newComment,
      //   ...mainPosts[targetIdx].Comments,
      // ];

      // return {
      //   ...state,
      //   mainPosts: mainPosts,
      //   isAddCommentDone: true,
      //   isProcessing: false,
      // };

      case ADD_COMMENT_FAILURE:
        draft.isProcessing = false;
        draft.isAddCommentDone = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      // return {
      //   ...state,
      //   isProcessing: false,
      //   isAddCommentDone: false,
      //   isErrorOccured: true,
      //   error: action.error,
      // };

      case REMOVE_POST_REQUEST:
        return {
          ...state,
          isProcessing: true,
          isRemovePostDone: false,
          isErrorOccured: false,
          error: null,
        };

      case REMOVE_POST_SUCCESS:
        // draft.mainPosts.filter((post) => post.id !== action.data.PostId);
        // draft.isProcessing = false;
        // draft.isRemovePostDone = true;
        // break;

        return {
          ...state,
          mainPosts: state.mainPosts.filter(
            (post) => post.id !== action.data.PostId
          ),

          isProcessing: false,
          isRemovePostDone: true,
        };

      case REMOVE_POST_FAILURE:
        return {
          ...state,
          isProcessing: false,
          isRemovePostDone: false,
          isErrorOccured: true,
          error: action.error,
        };

      case REMOVE_COMMENT_REQUEST:
        return {
          ...state,
          isProcessing: true,
          isRemovePostDone: false,
          isRemoveCommentDone: false,
        };

      case LOAD_POSTS_REQUEST:
        draft.isProcessing = true;
        draft.isAddPostDone = false;
        break;

      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.isProcessing = false;
        draft.isAddPostDone = true;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;

      case LOAD_POSTS_FAILURE:
        draft.isProcessing = false;
        draft.isAddPostDone = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      case TOGGLE_LIKE_REQUEST:
        draft.isProcessing = true;
        break;

      case TOGGLE_LIKE_SUCCESS:
        const likedPost = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );

        if (action.data.isLiked) {
          likedPost.Likers.push(action.data.UserId);
        } else {
          likedPost.Likers = likedPost.Likers.filter((id) => {
            return id !== action.data.UserId;
          });
        }

        draft.isProcessing = false;
        break;

      case TOGGLE_LIKE_FAILURE:
        draft.isProcessing = false;
        draft.isErrorOccured = true;
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });

export default postReducer;
