import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import { useMemo, useState } from "react";
import UserProfile from "../UserProfile";
import LoginForm from "../forms/LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function AppLayout({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div style={{}}>
      <p>공통메뉴</p>
      <Menu mode="horizontal">
        <Menu.Item key={"/"}>
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
        {!isLoggedIn && (
          <Menu.Item key={"signup"}>
            <Link href="/signup">
              <p>회원가입</p>
            </Link>
          </Menu.Item>
        )}
      </Menu>
      {/* Responsive */}
      {/* 가로 정의 => 세로  */}
      {/* 모바일 => 데스크탑 순으로  */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile isLoggedIn={isLoggedIn} />
          ) : (
            <LoginForm isLoggedIn={isLoggedIn} />
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
