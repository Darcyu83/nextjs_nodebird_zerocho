import { List } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PostCart from "./PostCard";

function PostCardList({ mainPosts }) {
  const userId = useSelector((state) => state.user.id);

  return (
    <List>
      {mainPosts.map((post) => (
        <List.Item key={post.id} style={{ marginTop: 20 }}>
          <PostCart post={post} userId={userId} />
        </List.Item>
      ))}
    </List>
  );
}

PostCardList.propTypes = {
  mainPosts: PropTypes.arrayOf(PropTypes.object),
};

export default PostCardList;
