import styled, { createGlobalStyle } from "styled-components";

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 18px;
    line-height: 44px;
    color: #333;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
`;

export const SliderWrapper = styled.div`
  & div {
    vertical-align: middle;
  }
`;

export const ImgWrapper = styled.div`
  display: flex !important;
  align-items: center;

  padding: 32px;
  height: 750px;

  & img {
    margin: 0 auto;
    max-height: 750px;
    vertical-align: middle;
  }
`;

export const Indicator = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 5%;
  text-align: center;

  & span {
    padding: 5px 10px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const SlickGlobal = createGlobalStyle`
  .slick-slider {}

  .slick-dots li button:before{ 
      color: white;
      opacity: 1;
  }
 
    .slick-dots li button:hover:before{ 
      color: black;
      opacity: 1;
  }


  .ant-card-cover{
    transform: none !important;
  }
`;
