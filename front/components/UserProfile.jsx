import { Avatar, Button, Card } from "antd";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../redux/reducers/user";

const { Meta } = Card;

function UserProfile() {
  const {
    isProcessing,
    me: { Posts, nickname, Followings, Followers },
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
          {Posts.length}
        </div>,
        <div key="Followed">
          Followed <br />
          {Followings.length}
        </div>,
        <div key="Followings">
          Followings <br />
          {Followers.length}
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar>{nickname && nickname[0]}</Avatar>}
        title={nickname}
      />
      <Button onClick={onLogOut} loading={isProcessing}>
        로그아웃
      </Button>
    </Card>
  );
}

UserProfile.propTypes = { isProcessing: PropTypes.bool };

export default UserProfile;
