import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { loadMyInfoAction, LOAD_USER_REQUEST } from "../redux/reducers/user";
import wrapper from "../redux/store/configureStore";

function About({}) {
  const {
    isProcessing,
    userInfo: { nickname, Posts, Followers, Followings },
  } = useSelector((state) => state.user);
  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          <br />
          {Posts}
        </div>,
        <div key="Followings">
          팔로잉 <br />
          {Followings}
        </div>,
        <div key="Followers">
          팔로워 <br />
          {Followers}
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar>{nickname && nickname[0]}</Avatar>}
        title={nickname}
      />
    </Card>
  );
}

export default About;

export const getStaticProps = wrapper.getStaticProps(async (_ctx) => {
  _ctx.store.dispatch({ type: LOAD_USER_REQUEST, data: { id: 23 } });
  _ctx.store.dispatch(END);
  await _ctx.store.sagaTask.toPromise();
});
