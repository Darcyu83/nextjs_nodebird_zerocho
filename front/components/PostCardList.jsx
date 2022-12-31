import { Button, Card, List } from "antd";
import PropTypes from "prop-types";

function PostCardList({ mainPosts }) {
  return (
    <List>
      {mainPosts.map((post) => (
        <List.Item key={post.id} style={{ marginTop: 20 }}>
          <Card
            cover={post.Images[0] && <img src={post.Images[0].src} />}
            actions={[
              <Button key={"delete"}>X</Button>,
              <Button key={"delete"}>B</Button>,

              <Button key={"delete"}>C</Button>,
              <Button key={"delete"}>C</Button>,
              <Button key={"delete"}>C</Button>,
            ]}
          >
            {post.content}
          </Card>
        </List.Item>
      ))}
    </List>
  );
}

PostCardList.propTypes = {
  mainPosts: PropTypes.array.isRequired,
};

export default PostCardList;
