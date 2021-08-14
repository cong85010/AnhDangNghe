import { Card, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useContext, useEffect, useState } from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";
import { MusicPlayerContext } from "components/contextAPI/context";

const SubMusic = ({ data, circle = false, rotate = false }) => {
  const {
    title = Default.Title,
    creator = Default.Auth,
    avatar = Default.Url,
  } = data;
  const [activePLay, setActivePLay] = useState("");
  const { musicPlay, saveMusic } = useContext(MusicPlayerContext);
  const playToMusic = () => {
    // localStorage.setItem("playToMusic", JSON.stringify(data))
    console.log(data);
    saveMusic(data);
  };
  useEffect(() => {
    setActivePLay(`${musicPlay.music === data.music ? 'MusicPLaying':''}`)
  }, [musicPlay]);

  return (
    <Tooltip placement="topLeft" mouseEnterDelay='0.7' title={title}>
      <Card
      onClick={playToMusic}
      className={` 
      SubMusic 
      ${circle ? "SubMenuCircle" : "SubMenu_Square"}
      ${rotate && "animateRotate"} 
      ${!circle && activePLay}`}
      size="small"
    >
      <Meta
        avatar={
          <Avatar
            shape={circle ? "circle" : "square"}
            size="large"
            src={avatar}
          />
        }
        title={title}
        description={creator}
      />
    </Card>
    </Tooltip>
  );
};

export default SubMusic;
