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
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_POST_REQUEST } from "../redux/reducers/post";
import PostCommentForm from "./forms/PostCommentForm";
import PostCardContent from "./PostCardContent";
import PostCommentCardList from "./PostCommentCardList";
import PostImage from "./PostImage";

function PostCard({ post, userId }) {
  const [liked, setLiked] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.post.isProcessing);

  const onToggleCommentForm = useCallback(() => {
    setIsCommentFormOpen((prev) => !prev);
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onClickDelete = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post });
  }, []);

  return (
    <div>
      <Card
        style={{ marginBottom: 10 }}
        cover={post.images[0] && <PostImage images={post.images} />}
        actions={[
          <RetweetOutlined key={"retweet"} />,
          liked ? (
            <HeartTwoTone
              onClick={onToggleLike}
              key={"liked"}
              twoToneColor={"#eb2f96"}
            />
          ) : (
            <HeartOutlined onClick={onToggleLike} />
          ),
          <MessageOutlined key={"msg"} onClick={onToggleCommentForm} />,
          <Popover
            key="Ellipsis"
            content={
              <ButtonGroup>
                {userId === post.user.id && (
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
                {userId !== post.user.id && <Button>신고</Button>}
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.user.nickname[0].toUpperCase()}</Avatar>}
          title={post.user.nickname}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {isCommentFormOpen && <PostCommentForm post={post} />}

      <PostCommentCardList comments={post.comments} />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.string,
};

export default PostCard;
