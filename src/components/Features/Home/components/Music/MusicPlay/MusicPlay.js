import React, { useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Button, Col, Row, Tooltip } from "antd";
import SubMusic from "../SubMusic/SubMusic";
import {
  HeartOutlined,
  PlayCircleOutlined,
  DashOutlined,
} from "@ant-design/icons";
export default function MusicPlay({ musicPlay }) {
  const [play, setPlay] = useState(false);
  console.log(play)
  return (
    <div className="musicPlay">
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
            src={'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=GBFE-67ngNRrevGDcvz6sQ&e=1628283282'}
            showSkipControls={true}
            showJumpControls={false}
            className="musicPlay--mid"
            layout="stacked-reverse"
           
            onPause ={() => setPlay(!play)}
            onPlay ={() => setPlay(!play)}
          />
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}
