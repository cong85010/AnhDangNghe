import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";

const SubMusic = ({ data, circle = false, rotate = false }) => {
  
  const {
    title = Default.Title,
    creator = Default.Auth,
    avatar = Default.Url,
  } = data;
  const playToMusic = () => {
      localStorage.setItem("playToMusic", JSON.stringify(data))
  }
  return (
    <Card onClick={playToMusic} className={`SubMusic ${circle && 'SubMenuCircle'} ${rotate && 'animateRotate'}`} size="small">
      <Meta
        avatar={<Avatar shape={circle?'circle':'square'} size="large" src={avatar} />}
        title={title}
        description={creator}
      />
    </Card>
  );
};

export default SubMusic;
