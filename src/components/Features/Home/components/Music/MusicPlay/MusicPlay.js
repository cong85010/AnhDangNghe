import React, { useState } from "react";
import amNhac from "assets/music/muonroisaocon.mp3";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Col, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
export default function MusicPlay() {
  const [play, setPlay] = useState(false);
  return (
    <div className="musicPlay">
      <Row>
        <Col span={6}>
          <div className="musicPlay--left">
                {/* <SubMenu data={play} circle={true}/> */}
              </div>
        </Col>
        <Col span={12}>
          <H5AudioPlayer
            src={amNhac}
            showSkipControls={true}
            showJumpControls={false}
            className="musicPlay--mid"
            layout="stacked-reverse"
            onClick={() => setPlay(!play)}
          />
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}
