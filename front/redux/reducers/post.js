import { HYDRATE } from "next-redux-wrapper";
import produce from "immer";

const createId = () => {
  return Math.floor(Math.random() * 100000);
};

export const generateDummyPostData = (qnty) => {
  return Array(qnty)
    .fill()
    .map((y, i) => {
      const id = createId();

      return {
        id: id,
        user: {
          id: id,
          nickname: "id의 닉네임" + id,
        },
        content: "id::의 글 :" + id + `#${id}`,
        images: [
          { src: "https://via.placeholder.com/1920x1080" },
          i % 4 === 0
            ? {
                src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
              }
            : i % 4 === 1
            ? {
                src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
              }
            : i % 4 === 2
            ? {
                src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
              }
            : { src: "https://avatars.githubusercontent.com/u/62939972?v=4" },
        ],
        comments: [
          {
            user: { id: "21", nickname: "hoho" },
            id: 1,
            content: "Oh first Post",
          },
        ],
      };
    });
};

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

// initialState.mainPosts = generateDummyPostData(10);

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

export const dummyPost = (action) => ({
  id: createId(),
  user: { id: action.data.userId, nickname: action.data.userId },
  content: action.data.content
    ? action.data.content
    : "first post #어흥 #하하 #한국",
  images: [
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
  comments: [
    { user: { id: "21", nickname: "khoirahoho" }, content: "Oh first Post" },
    {
      user: { id: "31", nickname: "lhahahoira" },
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
        // 새로운 코멘트
        const newComment = {
          user: {
            id: action.data.userId,
            nickname: "reply:: " + action.data.userId,
          },
          id: Math.random() * 100000,
          content: action.data.content,
        };

        // 코멘트 추가할 원글 찾기
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.postId
        );

        // 맨앞으로 추가
        post.comments.unshift(newComment);
        draft.isAddCommentDone = true;
        draft.isProcessing = false;
        break;

      // const targetIdx = state.mainPosts.findIndex(
      //   (post) => post.id === action.data.postId
      // );

      // const mainPosts = state.mainPosts;
      // mainPosts[targetIdx].comments = [
      //   newComment,
      //   ...mainPosts[targetIdx].comments,
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
        draft.mainPosts = draft.mainPosts.filter(
          (post) => post.id !== action.data.id
        );
        draft.isProcessing = false;
        draft.isRemovePostDone = true;
        break;

      // return {
      //   ...state,
      //   mainPosts: state.mainPosts.filter(
      //     (post) => post.id !== action.data.id
      //   ),

      //   isProcessing: false,
      //   isRemovePostDone: true,
      // };

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

      default:
        return state;
    }
  });

export default postReducer;
