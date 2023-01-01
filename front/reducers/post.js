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
  postAdded: false,
};

const ADD_POST = "ADD_POST";

const dummyPost = () => ({
  id: "2",
  User: { id: "11", nickname: "hohohaah" },
  content: "first post #어흥 #하하 #한국",
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

export const addPostAction = (data) => {
  return {
    type: ADD_POST,
    data: dummyPost(),
  };
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case ADD_POST:
      return { ...state, mainPosts: [action.data, ...state.mainPosts] };
    default:
      return state;
  }
};

export default postReducer;
