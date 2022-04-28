import { Card, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";
import { MusicPlayerContext } from "components/contextAPI/context";

const SubMusic = ({
  data,
  circle = false,
  rotate = false,
  notHover = false,
}) => {
  const dataAfter  = {
    title: Default.title,
    creator: Default.creator,
    thumbnail: Default.avatar,
    ...data
  }
  const { title, artists, thumbnail } = dataAfter;
  const { playing, saveMusic } = useContext(MusicPlayerContext);
  const playToMusic = () => {
    saveMusic(dataAfter);
  };
  return (
    <Tooltip placement="topLeft" mouseEnterDelay="0.7" title={title}>
      <Card
        onClick={playToMusic}
        className={` 
      SubMusic 
      ${circle ? "SubMenuCircle" : "SubMenu_Square"}
      ${notHover && "NotHover"}
      ${rotate && "animateRotate"} 
      ${!circle && playing?.key === dataAfter.key && "MusicPLaying"}`}
        size="small"
      >
        <Meta
          avatar={
            <Avatar
              shape={circle ? "circle" : "square"}
              size="large"
              src={thumbnail}
            />
          }
          title={title}
          description={artists?.map(({name}) => name).join(", ")}
        />
      </Card>
    </Tooltip>
  );
};

export default SubMusic;
