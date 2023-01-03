import { List } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function PostCardList({ mainPosts }) {
  const userId = useSelector((state) => state.user.me.id);

  return (
    <List>
      {mainPosts.map((post) => (
        <List.Item key={post.id} style={{ marginTop: 20 }}>
          <PostCard post={post} userId={userId} />
        </List.Item>
      ))}
    </List>
  );
}

PostCardList.propTypes = {
  mainPosts: PropTypes.arrayOf(PropTypes.object),
};

export default PostCardList;
