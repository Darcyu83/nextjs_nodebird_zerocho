import PropTeyps from "prop-types";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloseOutlined } from "@ant-design/icons";
import {
  CloseBtn,
  Header,
  ImgWrapper,
  Indicator,
  OverlayContainer,
  SlickGlobal,
  SliderWrapper,
} from "./styles";
import { backUrl } from "../../config/config";

function ImageZoom({ images, onClose }) {
  const [currSlide, setCurrSlide] = useState(0);

  return (
    <OverlayContainer>
      <SlickGlobal />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>
          <CloseOutlined />
        </CloseBtn>
      </Header>
      <SliderWrapper>
        <div>
          <Slider
            initialSlide={0}
            beforeChange={(currSlide) => setCurrSlide(currSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
            dots
          >
            {images.map((img) => (
              <ImgWrapper key={img.src}>
                <img src={backUrl + img.src} alt={img.src} />
              </ImgWrapper>
            ))}
          </Slider>
        </div>
      </SliderWrapper>
      <Indicator>
        <span>{`${currSlide + 1} / ${images.length}`}</span>
      </Indicator>
    </OverlayContainer>
  );
}

ImageZoom.propTypes = {
  images: PropTeyps.arrayOf(PropTeyps.shape({ src: PropTeyps.string }))
    .isRequired,
  onClose: PropTeyps.func.isRequired,
};

export default ImageZoom;
