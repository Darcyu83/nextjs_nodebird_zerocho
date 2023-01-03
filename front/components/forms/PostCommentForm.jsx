import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { addCommentRequestAction } from "../../redux/reducers/post";

function PostCommentForm({ post }) {
  const dispatch = useDispatch();
  const {
    me: { id, nickname },
  } = useSelector((state) => state.user);
  const { isAddCommentDone } = useSelector((state) => state.post);

  const [commentText, onChangeContent, setCommentText] = useInput(post.content);

  const onSubmit = useCallback(() => {
    console.log(id, nickname, commentText);

    dispatch(
      addCommentRequestAction({
        data: { content: commentText, postId: post.id, userId: id },
      })
    );
  }, [id, commentText]);

  useEffect(() => {
    if (isAddCommentDone) setCommentText("");
  }, [isAddCommentDone]);

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
