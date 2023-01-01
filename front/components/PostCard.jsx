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
import PostCommentForm from "./forms/PostCommentForm";
import PostCommentCardList from "./PostCommentCardList";

function PostCard({ post, userId }) {
  const [liked, setLiked] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const onToggleCommentForm = useCallback(() => {
    setIsCommentFormOpen((prev) => !prev);
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        style={{ marginBottom: 10 }}
        cover={post.Images[0] && <img src={post.Images[0].src} />}
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
                {userId === post.id && (
                  <>
                    <Button>수정</Button>
                    <Button type="ghost">삭제</Button>
                  </>
                )}
                <Button>신고</Button>
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {isCommentFormOpen && <PostCommentForm post={post} />}

      <PostCommentCardList comments={post.Comments} />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.string,
};
export default PostCard;
