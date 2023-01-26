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
  retweetRequestAction,
  toggleLikeRequestAction,
} from "../redux/reducers/post";
import FollowButton from "./FollowButton";
import PostCommentForm from "./forms/PostCommentForm";
import PostCardContent from "./PostCardContent";
import PostCommentCardList from "./PostCommentCardList";
import PostImage from "./PostImage";

import moment from "moment";

moment.locale("ko");
function PostCard({ post }) {
  const me = useSelector((state) => state.user.me);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const isLiked = post.Likers?.find((id) => id === me?.id);
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.post.isProcessing);

  const onToggleCommentForm = useCallback(() => {
    setIsCommentFormOpen((prev) => !prev);
  }, []);

  const onToggleLiked = useCallback(() => {
    if (!me) return alert("로그인이 필요합니다.");

    dispatch(toggleLikeRequestAction({ id: post.id, isLiked: !isLiked }));
  }, [me, isLiked]);

  const onClickDelete = useCallback(() => {
    if (!me) return alert("로그인이 필요합니다.");
    dispatch({ type: REMOVE_POST_REQUEST, data: { id: post.id } });
  }, [me]);

  const onRetweet = useCallback(() => {
    if (!me) return alert("로그인이 필요합니다.");
    dispatch(retweetRequestAction({ postId: post.id }));
  }, [me]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Card
        style={{}}
        cover={
          post.Images && post.Images[0] && <PostImage images={post.Images} />
        }
        actions={[
          <RetweetOutlined key={"retweet"} onClick={onRetweet} />,
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
        extra={me && me.id !== post.User.id && <FollowButton post={post} />}
      >
        {/* 리트윗 or 오리지널 게시글 */}
        {post.RetweetId && post.Retweet ? (
          <Card
            title={
              post.RetweetId
                ? `${post.User.nickname}님이 리트윗하셨습니다.`
                : null
            }
            cover={
              post.Retweet.Images &&
              post.Retweet.Images[0] && (
                <PostImage images={post.Retweet.Images} />
              )
            }
            extra={me && me.id !== post.User.id && <FollowButton post={post} />}
          >
            <div style={{ float: "right" }}>
              {moment(post.Retweet.createdAt).fromNow()}
            </div>
            <Card.Meta
              avatar={
                <Avatar>{post.Retweet.User.nickname[0].toUpperCase()}</Avatar>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent content={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>}
              title={post.User.nickname}
              description={<PostCardContent content={post.content} />}
            />
          </>
        )}
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
