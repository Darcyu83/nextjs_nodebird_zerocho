import { Button, Form, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import {
  addPostRequestAction,
  removeImageRequestAction,
  uploadImagesRequestAction,
} from "../../redux/reducers/post";

const FormContainer = styled(Form)`
  margin: 10px 0 28px;
  position: relative;
  padding-bottom: 2rem;
`;
function PostForm() {
  const dispatch = useDispatch();

  const { imagePaths, isAddPostDone, isProcessing } = useSelector(
    (state) => state.post
  );
  const userId = useSelector((state) => state.user.me.id);
  const fileRef = useRef();
  const [content, onChangeContent, setContent] = useInput("");

  const onSubmit = useCallback(() => {
    if (!content || !content.trim()) return alert("게시글을 작성하세요.");

    // formdata 쓰는 이유 : multer.none()으로
    // 파일없이 text만 받기 위함

    const formData = new FormData();

    imagePaths.forEach((path) => {
      formData.append("images_multer", path);
    });

    formData.append("content", content);

    dispatch(addPostRequestAction(formData));

    // 이미지 파일이 이미 올라간 상태
    // multer 안써도됨, 아래와 같이 json으로 보내도 됨.
    // dispatch(addPostRequestAction({ userId, content, imagePaths }));
  }, [content, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    console.log("fileRef.current", fileRef.current);
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeImages = useCallback((e) => {
    console.log("onChangeImages", e.target.files);
    const imgFormData = new FormData();

    // Array.from(e.target.files).map((file) => {
    //   console.log("onChangeImages forEach file11 ", file);
    //   imgFormData.append("images_multer", file);
    // });

    [].forEach.call(e.target.files, (file) => {
      console.log("onChangeImages forEach file ", file);
      imgFormData.append("images_multer", file);
    });

    dispatch(uploadImagesRequestAction(imgFormData));
  });

  const onRemoveImage = useCallback((idx) => {
    dispatch(removeImageRequestAction({ idx }));
  });

  useEffect(() => {
    if (isAddPostDone) setContent("");
  }, [isAddPostDone]);

  return (
    <FormContainer onFinish={onSubmit} encType="multipart/form-data">
      <Input.TextArea
        maxLength={140}
        value={content}
        onChange={onChangeContent}
        placeholder="할말을 입력하세요"
      />
      <div>
        <input
          ref={fileRef}
          type="file"
          name="images_multer"
          multiple
          hidden
          onChange={onChangeImages}
        />
        <Button
          style={{ position: "absolute", bottom: -10, left: 0 }}
          onClick={onClickImageUpload}
        >
          이미지 업로드
        </Button>
      </div>
      <div>
        {imagePaths.map((path, idx) => (
          <div key={path} style={{ display: "inline-block" }}>
            <img
              // src={`${backUrl}${path}`}
              // s3업로드 후에 location 값 s3전체 주소가 담겨져 옴
              src={`${path}`}
              style={{ width: "200px" }}
              alt={path}
            />
            <div>
              <Button onClick={() => onRemoveImage(idx)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        loading={isProcessing}
        htmlType="submit"
        type="primary"
        style={{ position: "absolute", bottom: -10, right: 0 }}
      >
        등록
      </Button>
    </FormContainer>
  );
}

export default PostForm;
