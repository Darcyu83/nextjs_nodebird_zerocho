import { Button, Form, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { addPostRequestAction } from "../../redux/reducers/post";

const FormContainer = styled(Form)`
  margin: 10px 0 28px;
`;
function PostForm() {
  const dispatch = useDispatch();

  const { imagePaths, isAddPostDone } = useSelector((state) => state.post);
  const fileRef = useRef();
  const [content, onChangeContent, setContent] = useInput("");

  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction({}));
  }, []);

  const onClickImageUpload = useCallback(() => {
    console.log("fileRef.current", fileRef.current);
    fileRef.current.click();
  }, [fileRef.current]);

  useEffect(() => {
    if (isAddPostDone) setContent("");
  }, [isAddPostDone]);

  return (
    <FormContainer onFinish={onSubmit}>
      <Input.TextArea
        maxLength={140}
        value={content}
        onChange={onChangeContent}
        placeholder="할말을 입력하세요"
      />
      <div>
        <input type="file" multiple hidden ref={fileRef} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
      </div>
      <div>
        {imagePaths.map((img) => (
          <div key={img} style={{ display: "inline-block" }}>
            <img src={img} style={{ width: "200px" }} alt={img} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
      <Button htmlType="submit" type="primary" style={{ float: "right" }}>
        등록
      </Button>
    </FormContainer>
  );
}

export default PostForm;
