import { Avatar, Button, Card } from "antd";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
  logoutRequestAction,
} from "../redux/reducers/user";

const { Meta } = Card;

function UserProfile() {
  const {
    isProcessing,
    me: { id, Posts, nickname, Followings, Followers },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadFollowersRequestAction({ id }));
      dispatch(loadFollowingsRequestAction({ id }));
    }
  }, [id]);

  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          <br />
          {Posts?.length}
        </div>,
        <div key="Followed">
          팔로잉 <br />
          {Followings?.length}
        </div>,
        <div key="Followings">
          팔로워 <br />
          {Followers?.length}
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
