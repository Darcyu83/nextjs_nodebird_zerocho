import AppLayout from "../components/layout/AppLayout";
import Head from "next/head";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loadMyInfoAction, signupRequestAction } from "../redux/reducers/user";
import Router from "next/router";
import wrapper from "../redux/store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

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

  const { me, isProcessing, isErrorOccured, error } = useSelector(
    (state) => state.user
  );

  const onSubmit = useCallback(() => {
    setTerm(true);

    dispatch(signupRequestAction({ email, nickname, password }));
  }, [email, password, nickname]);

  useEffect(() => {
    if (me) {
      Router.replace("/");
    }
  }, [me]);

  return (
    <AppLayout style={{}}>
      <Head>
        <title>???????????? | NodeBird</title>
      </Head>

      <FormContainer onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">?????????</label>
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
          <label htmlFor="user-password">????????????</label>
          <br />
          <Input
            name="user-password"
            value={password}
            onChange={onChangepassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">???????????? ??????</label>
          <br />
          <Input
            name="user-password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordErr && (
            <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="user-nickname">?????????</label>
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
            ????????? ???????????????.
          </Checkbox>
          <br />
          {termErr && <ErrorMessage> ????????? ??????????????? ?????????.</ErrorMessage>}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          disabled={termErr || passwordErr}
          loading={isProcessing}
        >
          ????????????
        </Button>
      </FormContainer>
    </AppLayout>
  );
}

Signup.propTypes = {};
export const getServerSideProps = wrapper.getServerSideProps(async (_ctx) => {
  console.log("\n\n\n  _ctx.req.headers  \n\n\n", _ctx.req.headers);

  // ????????? ?????? ?????? ????????? ????????? ???????????? ??????
  // ??????????????? ???????????? ?????? ????????? ??????????????? ??????.
  // ????????? ?????? ????????????.
  const cookie = _ctx.req ? _ctx.req.headers.cookie : null;
  axios.defaults.headers.Cookie = ""; // ?????? ????????? : ????????? ????????? ?????? ?????????

  if (_ctx.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  axios.defaults.headers.Cookie = cookie;
  _ctx.store.dispatch(loadMyInfoAction());
  _ctx.store.dispatch(END);
  await _ctx.store.sagaTask.toPromise();
});
export default Signup;
