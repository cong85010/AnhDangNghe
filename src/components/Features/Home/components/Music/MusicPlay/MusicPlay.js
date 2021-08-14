import React, { useState, useEffect, useContext } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Button, Col, Row, Tooltip } from "antd";
import SubMusic from "../SubMusic/SubMusic";
import Default from "constants/dataDefault";

import {
  HeartOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
export default function MusicPlay({nextPlay, prePlay, nextWillPlay}) {
  const [play, setPlay] = useState(false);
  
  const {musicPlay} = useContext(MusicPlayerContext);
  return (
    <div className={`musicPlay ${musicPlay.title}`}>
      <Row>
        <Col span={6}>
          <div className="musicPlay--left">
            <SubMusic data={musicPlay} circle={true} rotate={play} />
            <Tooltip title="Thích">
              {" "}
              <Button
                shape="circle"
                outline="true"
                type="text"
                icon={<HeartOutlined />}
              />
            </Tooltip>
            <Tooltip title="Xem thêm">
              <Button
                shape="circle"
                outline="true"
                type="text"
                icon={<DashOutlined />}
              />
            </Tooltip>
          </div>
        </Col>
        <Col span={12}>
          <H5AudioPlayer
            src={musicPlay.music}
            showSkipControls={true}
            showJumpControls={false}
            className="musicPlay--mid"
            layout="stacked-reverse"
            onPause={() => setPlay(false)}
            onPlay={() => setPlay(true)}
            onClickNext={() => nextPlay()}
            onClickPrevious={() => prePlay()}
            onEnded={() => nextPlay()}
          />
        </Col>
        <Col span={6}>
          <div className="musicPlay--right">
             <SubMusic  data={nextWillPlay()}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}
