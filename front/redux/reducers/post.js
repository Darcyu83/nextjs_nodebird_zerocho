import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  mainPosts: [
    {
      id: "1",
      User: { id: "11", nickname: "haah" },
      content: "first post #hasValue #인물",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
      ],
      Comments: [
        { User: { id: "21", nickname: "hoho" }, content: "Oh first Post" },
        { User: { id: "31", nickname: "hoira" }, content: "Oh first Post 2 2" },
      ],
    },
  ],
  imagePaths: [],
  isProcessing: false,
  isAddPostDone: false,
  isAddCommentDone: false,
  isErrorOccured: false,
  error: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

const dummyPost = (action) => ({
  id: "2",
  User: { id: "11", nickname: "hohohaah" },
  content: action.data.content
    ? action.data.content
    : "first post #어흥 #하하 #한국",
  Images: [
    {
      src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
    },
    {
      src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
    },
    {
      src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
    },
    { src: "https://avatars.githubusercontent.com/u/62939972?v=4" },
  ],
  Comments: [
    { User: { id: "21", nickname: "khoirahoho" }, content: "Oh first Post" },
    {
      User: { id: "31", nickname: "lhahahoira" },
      content: "Oh first Post 2 2",
    },
  ],
});

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

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case ADD_POST_REQUEST:
      return {
        ...state,
        isProcessing: true,
        isAddPostDone: false,
        isErrorOccured: false,
        error: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [...dummyPost(action), ...state.mainPosts],
        isAddPostDone: true,
        isProcessing: false,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isAddPostDone: false,
        isErrorOccured: true,
        error: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isProcessing: true,
        isAddCommentDone: false,
        isErrorOccured: false,
        error: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
        isAddCommentDone: true,
        isProcessing: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isAddCommentDone: false,
        isErrorOccured: true,
        error: action.error,
      };

    default:
      return state;
  }
};

export default postReducer;
