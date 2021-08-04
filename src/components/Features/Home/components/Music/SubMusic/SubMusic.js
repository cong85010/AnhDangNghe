import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";
import imgError from "assets/images/error.jpg";
import "./SubMusic.scss";

const SubMusic = ({ data }) => {
  const {
    title = "Chưa xác định",
    url = imgError,
    auth = "Đang cập nhật",
  } = data;
  return (
    <Card className="SubMusic" size="small">
      <Meta
        avatar={<Avatar shape="square" size="large" src={url} />}
        title={title}
        description={auth}
      />
    </Card>
  );
};

export default SubMusic;
