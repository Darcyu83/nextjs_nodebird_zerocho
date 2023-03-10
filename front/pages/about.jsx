import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { loadMyInfoAction, LOAD_USER_REQUEST } from "../redux/reducers/user";
import wrapper from "../redux/store/configureStore";

function About({}) {
  const { isProcessing, userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_USER_REQUEST, data: { id: 21 } });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          <br />
          {userInfo?.Posts}
        </div>,
        <div key="Followings">
          팔로잉 <br />
          {userInfo?.Followings}
        </div>,
        <div key="Followers">
          팔로워 <br />
          {userInfo?.Followers}
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar>{userInfo?.nickname && userInfo.nickname[0]}</Avatar>}
        title={userInfo?.nickname}
      />
    </Card>
  );
}

export default About;

// export const getStaticProps = wrapper.getStaticProps(async (_ctx) => {
//   _ctx.store.dispatch({ type: LOAD_USER_REQUEST, data: { id: 21 } });
//   _ctx.store.dispatch(END);
//   await _ctx.store.sagaTask.toPromise();
// });
