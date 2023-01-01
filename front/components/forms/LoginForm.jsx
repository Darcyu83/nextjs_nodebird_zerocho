import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormContainer = styled(Form)`
  padding: 10px;
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
  const [id, onChangeId] = useInput();
  const [pwd, onChangePwd] = useInput();

  // custom hook
  const onSubmitForm = useCallback(() => {
    console.log(id, pwd);
    dispatch(loginRequestAction({ id, pwd }));
  }, [id, pwd]);

  return (
    <div style={{}}>
      <FormContainer method="post" onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
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
      </FormContainer>
    </div>
  );
}

LoginForm.propTypes = { isProcessing: PropTypes.bool };
export default LoginForm;
