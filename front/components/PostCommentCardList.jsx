import { Avatar, Card, List } from "antd";
import PropTyeps from "prop-types";
import { useEffect } from "react";

function PostCommentCardList({ comments }) {
  return (
    <List
      header={`${comments.length}개의 댓글`}
      dataSource={comments}
      renderItem={(comment) => (
        <List.Item>
          <Card style={{ width: "100%" }}>
            <Card.Meta
              title={comment.User?.nickname}
              avatar={
                <Avatar>{comment.User?.nickname[0].toUpperCase()}</Avatar>
              }
              description={comment.content}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

PostCommentCardList.propTypes = {
  comments: PropTyeps.arrayOf(PropTyeps.object),
};
export default PostCommentCardList;
