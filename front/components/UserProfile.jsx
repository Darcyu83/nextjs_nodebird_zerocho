import { Avatar, Button, Card } from "antd";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../redux/reducers/user";

const { Meta } = Card;

function UserProfile() {
  const {
    isProcessing,
    me: { posts, nickname, followings, followers },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          <br />
          {posts.length}
        </div>,
        <div key="followed">
          Followed <br />
          {followings.length}
        </div>,
        <div key="followings">
          Followings <br />
          {followers.length}
        </div>,
      ]}
    >
      <Meta avatar={<Avatar>{nickname}</Avatar>} title={nickname} />
      <Button onClick={onLogOut} loading={isProcessing}>
        로그아웃
      </Button>
    </Card>
  );
}

UserProfile.propTypes = { isProcessing: PropTypes.bool };

export default UserProfile;
