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

  const isFollowing = me.followings.some(
    ({ nickname }) => nickname === post.user.nickname
  );

  const dispatch = useDispatch();

  const onFollow = useCallback(() => {
    if (!isFollowing) dispatch(followRequestAction(post.user.nickname));
    if (isFollowing) dispatch(unfollowRequestAction(post.user.nickname));
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
