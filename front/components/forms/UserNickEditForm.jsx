import { Form, Input } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { changeNicknameRequestAction } from "../../redux/reducers/user";

const SearchInput = styled(Input.Search)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
function UserNickEditForm() {
  const me = useSelector((state) => state.user.me);
  const dispatch = useDispatch();

  const [nickname, onChangeValue] = useInput(me?.nickname || "");

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction({ nickname }));
  }, [nickname]);

  return (
    <Form>
      <SearchInput
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeValue}
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default UserNickEditForm;
