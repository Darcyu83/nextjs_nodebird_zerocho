import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Popover } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_POST_REQUEST,
  toggleLikeRequestAction,
} from "../redux/reducers/post";
import FollowButton from "./FollowButton";
import PostCommentForm from "./forms/PostCommentForm";
import PostCardContent from "./PostCardContent";
import PostCommentCardList from "./PostCommentCardList";
import PostImage from "./PostImage";

function PostCard({ post }) {
  const me = useSelector((state) => state.user.me);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const isLiked = post.Likers.find((id) => id === me?.id);
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.post.isProcessing);

  const onToggleCommentForm = useCallback(() => {
    setIsCommentFormOpen((prev) => !prev);
  }, []);

  const onToggleLiked = useCallback(() => {
    console.log(
      `%c[ PostCard.jsx ]::  isLiked: `,
      "background-color: orange; color: white;",
      isLiked
    );

    if (!me) return alert("로그인이 필요합니다.");

    dispatch(toggleLikeRequestAction({ id: post.id, isLiked: !isLiked }));
  }, [me, isLiked]);

  const onClickDelete = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: { id: post.id } });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Card
        style={{}}
        cover={
          post.images && post.images[0] && <PostImage images={post.images} />
        }
        actions={[
          <RetweetOutlined key={"retweet"} />,
          isLiked ? (
            <HeartTwoTone
              onClick={onToggleLiked}
              key={"liked"}
              twoToneColor={"#eb2f96"}
            />
          ) : (
            <HeartOutlined onClick={onToggleLiked} />
          ),
          <MessageOutlined key={"msg"} onClick={onToggleCommentForm} />,
          <Popover
            key="Ellipsis"
            content={
              <ButtonGroup>
                {me && me.id === post.User.id && (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="primary"
                      danger
                      onClick={onClickDelete}
                      loading={isProcessing}
                    >
                      삭제
                    </Button>
                  </>
                )}
                {me && me.id !== post.User.id && <Button>신고</Button>}
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {isCommentFormOpen && <PostCommentForm post={post} />}

      <PostCommentCardList comments={post.Comments} />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.number,
};

export default PostCard;
