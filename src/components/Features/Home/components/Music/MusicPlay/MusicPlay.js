import React, { useContext, useEffect, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Button, Col, Dropdown, Menu, notification, Row, Tooltip } from "antd";
import SubMusic from "../SubMusic/SubMusic";
import NhacCuaTui from "nhaccuatui-api-full";

import {
  HeartOutlined,
  DownloadOutlined,
  DashOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
import { toast, ToastContainer } from "react-toastify";
export default function MusicPlay({ nextWillPlay, charCode }) {
  const {
    playing = {},
    isPlay,
    setIsPlay,
    nextPrePlayingMusic,
  } = useContext(MusicPlayerContext);
  const [music, setMusic] = useState({});
  const playerRef = useRef(null);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href={playing} target="blank">
          Tải nhạc
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
  useEffect(() => {
    if (playerRef.current) {
      if (charCode.code === 32) {
        if (isPlay) {
          playerRef.current.audio.current.pause();
        } else {
          playerRef.current.audio.current.play();
        }
      } else {
        const currentTime = playerRef.current.audio.current.currentTime;
        const volume = playerRef.current.audio.current.volume;
        if (charCode.code === 37) {
          playerRef.current.audio.current.currentTime = currentTime - 5;
        }
        if (charCode.code === 39) {
          playerRef.current.audio.current.currentTime = currentTime + 5;
        }
        if (charCode.code === 189 && volume - 0.2 >= 0) {
          playerRef.current.audio.current.volume = volume - 0.2;
        }
        if (charCode.code === 187 && volume + 0.2 <= 1) {
          playerRef.current.audio.current.volume = volume + 0.2;
        }
      }
    }
  }, [charCode.isLoad]);
  const openNotification = () => {
    notification.success({
      message: "Tải xuống ...",
      className: "custom-class",
      style: {
        width: 230,
      },
    });
  };
  const loadingDown = () => {
    clearTimeout(loadingDown);
    setTimeout(() => {
      window.open(playing.music);
    }, 2000);
    openNotification();
  };
  useEffect(() => {
    NhacCuaTui.getSong(playing.key).then((res) => setMusic(res.song));
  }, [playing]);
  return (
    <div className={`musicPlay ${playing?.title}`}>
      <Row>
        <Col xs={5} sm={9} md={6} lg={6} xl={6}>
          <div className="musicPlay--left">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <SubMusic data={playing} circle={true} rotate={isPlay} />
            </Col>
            <Col className="flex-center" xs={0} sm={0} md={4} lg={4} xl={4}>
              <Tooltip title="Thích">
                <Button
                  shape="circle"
                  outline="true"
                  type="text"
                  icon={<HeartOutlined />}
                />
              </Tooltip>
            </Col>
            <Col className="flex-center" xs={0} sm={0} md={4} lg={4} xl={4}>
              <Tooltip title="Xem thêm">
                <Dropdown color="primary" overlay={menu} trigger={["click"]}>
                  <Button
                    shape="circle"
                    outline="true"
                    type="text"
                    icon={<DashOutlined />}
                  />
                </Dropdown>
              </Tooltip>
            </Col>
          </div>
        </Col>
        <Col xs={19} sm={15} md={16} lg={12} xl={12}>
          {music?.streamUrls?.length && (
            <H5AudioPlayer
              src={music?.streamUrls && music.streamUrls[0].streamUrl}
              showSkipControls={true}
              showJumpControls={false}
              className="musicPlay--mid"
              layout="stacked-reverse"
              onPause={() => setIsPlay(false)}
              onPlay={() => setIsPlay(true)}
              onClickNext={() => nextPrePlayingMusic(1)}
              onError={() => nextPrePlayingMusic(1)}
              onClickPrevious={() => nextPrePlayingMusic(-1)}
              onEnded={() => nextPrePlayingMusic(1)}
              ref={playerRef}
              onPlayError
            />
          )}
        </Col>
        <Col xs={0} sm={0} md={0} lg={2} xl={2}>
          <div className="musicPlay--right musicPlay--left">
            <Tooltip title="Vol+ key +, Vol- key -, <= -5s, => +5s,  Pause/Play key space">
              <Button
                shape="circle"
                outline="true"
                type="text"
                icon={<ToolOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Tải nhạc">
              <Button
                shape="circle"
                outline="true"
                type="text"
                onClick={loadingDown}
                icon={<DownloadOutlined />}
              ></Button>
            </Tooltip>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} xl={4}>
          <div className="musicPlay--right">
            <SubMusic data={nextWillPlay()} notHover={true} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
