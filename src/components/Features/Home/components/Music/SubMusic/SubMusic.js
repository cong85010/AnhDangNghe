import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";
import { MusicPlayerContext } from "components/contextAPI/context";

const SubMusic = ({ data, circle = false, rotate = false }) => {
  
  const {
    title = Default.Title,
    creator = Default.Auth,
    avatar = Default.Url,
  } = data;
  const {saveMusic} = useContext(MusicPlayerContext);
  const playToMusic = () => {
      // localStorage.setItem("playToMusic", JSON.stringify(data))
      console.log(data)
      saveMusic(data)
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
