import { Button, Card, List } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";

const ListContainer = styled(List)`
  margin-bottom: 20px;
`;

function FollowCardList({ header, data }) {
  return (
    <ListContainer
      grid={{ gutter: 4, xs: 2, md: 3 }}
      header={<p>{header}</p>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>
            <p>더보기 </p>
          </Button>
        </div>
      }
      bordered
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    ></ListContainer>
  );
}

export default FollowCardList;

FollowCardList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
