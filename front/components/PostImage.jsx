import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { backUrl } from "../config/config";
import ImageZoom from "./imagesZoom";

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
`;
function PostImage({ images }) {
  const [isImgZoomed, setIsImgZoomed] = useState(false);

  const onZoom = useCallback(() => {
    setIsImgZoomed(true);
  }, []);

  const onClose = useCallback(() => {
    setIsImgZoomed(false);
  }, []);

  // 이미지 한개
  if (images.length === 1)
    return (
      <ImgContainer>
        <img
          style={{ width: "100%" }}
          role="presentation" // Screen Reader가 클릭 할 순 있지만 굳이 안해도 된다 라고 판단
          // src={backUrl + images[0].src}
          // alt={backUrl + images[0].src}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />

        {isImgZoomed && <ImageZoom images={images} onClose={onClose} />}
      </ImgContainer>
    );

  // 이미지 2개
  if (images.length === 2)
    return (
      <ImgContainer>
        <img
          style={{ width: "50%", display: "inline-block", cursor: "pointer" }}
          role="presentation" // Screen Reader가 클릭 할 순 있지만 굳이 안해도 된다 라고 판단
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{ width: "50%", display: "inline-block", cursor: "pointer" }}
          role="presentation" // Screen Reader가 클릭 할 순 있지만 굳이 안해도 된다 라고 판단
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {isImgZoomed && <ImageZoom images={images} onClose={onClose} />}
      </ImgContainer>
    );

  // 3개이상
  return (
    <ImgContainer>
      <div>
        <img
          style={{ width: "50%", display: "inline-block", cursor: "pointer" }}
          role="presentation" // Screen Reader가 클릭 할 순 있지만 굳이 안해도 된다 라고 판단
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />

        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            cursor: "pointer",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length}개의 사진 더보기
        </div>
      </div>

      {isImgZoomed && <ImageZoom images={images} onClose={onClose} />}
    </ImgContainer>
  );
}

PostImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string })),
};
export default PostImage;
