import { Card, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { useContext} from "react";
import "./SubMusic.scss";
import Default from "constants/dataDefault";
import { MusicPlayerContext } from "components/contextAPI/context";

const SubMusic = ({ data = {
  title: Default.Title,
  creator: Default.Auth,
  avatar: Default.Url,
}, circle = false, rotate = false, notHover=false }) => {
  const {
    title,
    creator,
    avatar,
  } = data;
  const { playing, saveMusic } = useContext(MusicPlayerContext);
  const playToMusic = () => {
    // localStorage.setItem("playToMusic", JSON.stringify(data))
    console.log(data);
    saveMusic(data);
  };
  // useEffect(() => {
  //   console.log(ref)
  //     if(ref) {
  //       scrollIntoView(ref, { block: 'nearest', inline: 'center' })
  //     }
  // }, [ref])
  // setTimeout(() => {
  //   scrollIntoView(ref, { block: 'nearest', inline: 'center' })
  // }, 300)
  return (
    <Tooltip 
    placement="topLeft" mouseEnterDelay='0.7' title={title}>
      <Card
        onClick={playToMusic}
        className={` 
      SubMusic 
      ${circle ? "SubMenuCircle" : "SubMenu_Square"}
      ${notHover && "NotHover"}
      ${rotate && "animateRotate"} 
      ${!circle && playing.music === data.music && 'MusicPLaying'}`}
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
