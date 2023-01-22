import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import { useMemo, useState } from "react";
import UserProfile from "../UserProfile";
import LoginForm from "../forms/LoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child{

    padding-left: 0 !important;
  }

  .ant-col:last-child{


    padding-right: 0 mp !important;
  }

`;
function AppLayout({ children }) {
  const { me, isProcessing, error } = useSelector((state) => state.user);

  return (
    <div style={{}}>
      <Global />
      <p>공통메뉴</p>

      <Menu
        mode="horizontal"
        items={[
          {
            label: (
              <Link href="/">
                <p>노드버드</p>
              </Link>
            ),
          },
          {
            label: (
              <Link href="/profile">
                <p>프로필</p>
              </Link>
            ),
          },

          !me && {
            label: (
              <Link href="/signup">
                <p>회원가입</p>
              </Link>
            ),
          },
        ]}
      >
        {/* <Menu.Item key={"/"}>
          <Link href="/">
            <p>노드버드</p>
          </Link>
        </Menu.Item>
        <Menu.Item key={"profile"}>
          <Link href="/profile">
            <p>프로필</p>
          </Link>
        </Menu.Item>
        <Menu.Item key={"search"}>
          <SearchInput
            // style={{ verticalAlign: "middle" }}
            enterButton
          />
        </Menu.Item>
        {!me && (
          <Menu.Item key={"signup"}>
            <Link href="/signup">
              <p>회원가입</p>
            </Link>
          </Menu.Item>         )}*/}
      </Menu>
      {/* Responsive */}
      {/* 가로 정의 => 세로  */}
      {/* 모바일 => 데스크탑 순으로  */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? (
            <UserProfile />
          ) : (
            <LoginForm me={me} isProcessing={isProcessing} error={error} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/Darcyu83?tab=repositories"
            target="_blank"
            //보안
            rel="noopener noreferrer"
          >
            {`Darcy's Github`}
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
