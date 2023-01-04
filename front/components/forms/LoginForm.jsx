import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../redux/reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

function LoginForm({ isProcessing }) {
  // const [id, setId] = useState("userId");
  // const [pwd, setPwd] = useState("password");

  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);

  // const onChangePwd = useCallback((e) => {
  //   setPwd(e.target.value);
  // }, []);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput();
  const [pwd, onChangePwd] = useInput();

  // custom hook
  const onSubmitForm = useCallback(() => {
    console.log(email, pwd);
    dispatch(loginRequestAction({ email, pwd }));
  }, [email, pwd]);

  return (
    <div style={{}}>
      <Form method="post" onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="user-pwd">비밀번호</label>
          <br />
          <Input name="user-pwd" value={pwd} onChange={onChangePwd} required />
        </div>

        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={isProcessing}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonWrapper>
      </Form>
    </div>
  );
}

LoginForm.propTypes = { isProcessing: PropTypes.bool };
export default LoginForm;
