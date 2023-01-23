import { Button } from "antd";
import PorpTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followRequestAction,
  unfollowRequestAction,
} from "../redux/reducers/user";

function FollowButton({ post }) {
  const { me, isProcessing } = useSelector((state) => state.user);

  const isFollowing =
    me &&
    me.Followings instanceof Array &&
    me.Followings.some(({ nickname }) => nickname === post.User.nickname);

  const dispatch = useDispatch();

  const onFollow = useCallback(() => {
    if (!isFollowing) dispatch(followRequestAction({ id: post.User.id }));
    if (isFollowing) dispatch(unfollowRequestAction({ id: post.User.id }));
  }, [isFollowing]);

  return (
    <Button onClick={onFollow} loading={isProcessing}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PorpTypes.object.isRequired,
};

export default FollowButton;
