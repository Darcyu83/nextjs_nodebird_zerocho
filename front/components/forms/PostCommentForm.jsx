import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";

function PostCommentForm({ post }) {
  const dispatch = useDispatch();
  const { id: userId, nickname } = useSelector((state) => state.user);
  const [commentText, onChangeContent] = useInput(post.content);

  const onSubmit = useCallback(() => {
    console.log(userId, nickname, commentText);
  }, [userId, nickname, commentText]);

  return (
    <Form onFinish={onSubmit}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeContent}
        />

        <Button
          style={{ position: "absolute", right: 0, bottom: 0 }}
          type="primary"
          htmlType="submit"
        >
          등록
        </Button>
      </Form.Item>
    </Form>
  );
}

PostCommentForm.propTypes = {
  post: PropTypes.object,
};

export default PostCommentForm;
