import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";

const SubMusic = ({ data, circle = false }) => {
  
  const {
    title = Default.Title,
    url = Default.Url,
    auth = Default.Auth,
  } = data;
  return (
    <Card className="SubMusic" size="small">
      <Meta
        avatar={<Avatar shape={circle?'circle':'square'} size="large" src={url} />}
        title={title}
        description={auth}
      />
    </Card>
  );
};

export default SubMusic;
