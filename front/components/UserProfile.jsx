import { Avatar, Button, Card } from "antd";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const { Meta } = Card;

function UserProfile({ isProcessing }) {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="followed">Followed</div>,
        <div key="followings">Followings</div>,
      ]}
    >
      <Meta avatar={<Avatar>YUDS</Avatar>} title="userId" />
      <Button onClick={onLogOut} loading={isProcessing}>
        로그아웃
      </Button>
    </Card>
  );
}

UserProfile.propTypes = { isProcessing: PropTypes.bool };

export default UserProfile;
