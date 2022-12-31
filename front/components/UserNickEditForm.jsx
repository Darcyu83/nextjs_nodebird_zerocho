import { Form, Input } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
function UserNickEditForm() {
  return (
    <Form>
      <SearchInput addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
}

export default UserNickEditForm;
