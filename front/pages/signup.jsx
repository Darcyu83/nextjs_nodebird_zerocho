import AppLayout from "../components/layout/AppLayout";
import Head from "next/head";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { signupRequestAction } from "../redux/reducers/user";
import Router from "next/router";

const ErrorMessage = styled.p`
  color: red;
`;
const FormContainer = styled(Form)``;

function Signup() {
  // const [id, setId] = useState("");
  // const [password, setpassword] = useState("");
  // const [nickname, setNickname] = useState("");

  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);

  // const onChangepassword = useCallback((e) => {
  //   setpassword(e.target.value);
  // }, []);

  // const onChangeNickname = useCallback((e) => {
  //   setNickname(e.target.value);
  // }, []);
  const [email, onChangeEmail] = useInput();
  const [password, onChangepassword] = useInput();
  const [nickname, onChangeNickname] = useInput();

  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

  const [passwordErr, setPasswordErr] = useState(false);
  const [termErr, setTermErr] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordErr(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    if (e.target.checked) {
      setTermErr(false);
    } else {
      setTermErr(true);
    }
  }, []);

  const dispatch = useDispatch();

  const { isLoggedIn, isProcessing, isErrorOccured, error } = useSelector(
    (state) => state.user
  );

  const onSubmit = useCallback(() => {
    setTerm(true);

    dispatch(signupRequestAction({ email, nickname, password }));
  }, [email, password, nickname]);

  useEffect(() => {
    if (isLoggedIn) {
      Router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <AppLayout style={{}}>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>

      <FormContainer onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
          {isErrorOccured && (
            <ErrorMessage>{`${JSON.stringify(error)}`}</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="user-password">패스워드</label>
          <br />
          <Input
            name="user-password"
            value={password}
            onChange={onChangepassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">패스워드 확인</label>
          <br />
          <Input
            name="user-password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordErr && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          <br />
          {termErr && <ErrorMessage> 약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          disabled={termErr || passwordErr}
          loading={isProcessing}
        >
          가입하기
        </Button>
      </FormContainer>
    </AppLayout>
  );
}

Signup.propTypes = {};
export default Signup;
