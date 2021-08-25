import React, { useContext, useEffect, useRef } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Button, Col, Dropdown, Menu, notification, Row, Tooltip } from "antd";
import SubMusic from "../SubMusic/SubMusic";

import {
  HeartOutlined,
  DownloadOutlined,
  DashOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
export default function MusicPlay({ nextPrePlayingMusic, nextWillPlay, charCode }) {

  const { playing, isPlay, setIsPlay } = useContext(MusicPlayerContext);
  const playerRef = useRef(null)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href={playing.music} target="_blank">Tải nhạc</a>
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
      }
      else {
        const currentTime = playerRef.current.audio.current.currentTime;
        const volume = playerRef.current.audio.current.volume
        if (charCode.code === 37) {
          playerRef.current.audio.current.currentTime = currentTime - 5;
        }
        if (charCode.code === 39) {
          playerRef.current.audio.current.currentTime = currentTime + 5;
        }
          if(charCode.code === 189 && volume - 0.2 >= 0) {
            playerRef.current.audio.current.volume = volume - 0.2
          }
          if(charCode.code === 187 && volume + 0.2 <= 1) {
            playerRef.current.audio.current.volume = volume + 0.2
          }
        
      }
    }
  }, [charCode.isLoad])
  const openNotification = () => {
    notification.success({
      message: 'Tải xuống ...',
      className: 'custom-class',
      style: {
        width: 230,
      },
    });
  };
  const loadingDown = () => {
    clearTimeout(loadingDown)
    setTimeout(() => {
      window.open(playing.music)
    }, 2000);
    openNotification()
  }
  return (
    <div className={`musicPlay ${playing.title}`}>
      <Row>
        <Col span={6}>
          <div className="musicPlay--left">
            <SubMusic data={playing} circle={true} rotate={isPlay} />
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
              <Dropdown color="primary" overlay={menu} trigger={['click']}>
                <Button
                  shape="circle"
                  outline="true"
                  type="text"
                  icon={<DashOutlined />}
                />
              </Dropdown>
            </Tooltip>
          </div>
        </Col>
        <Col span={12}>
          <H5AudioPlayer
            src={playing.music}
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
          />
        </Col>
        <Col span={2}>
          <div className="musicPlay--right musicPlay--left">
          <Tooltip title="Vol+ key +, Vol- key -, <= -5s, => +5s,  Pause/Play key space">
              <Button shape="circle"
                outline="true"
                type="text"
                icon={<ToolOutlined />} >
              </Button>
            </Tooltip>
            <Tooltip title="Tải nhạc">
              <Button shape="circle"
                outline="true"
                type="text"
                onClick={loadingDown}
                icon={<DownloadOutlined />} >
              </Button>
            </Tooltip>
          </div>
        </Col>
        <Col span={4}>
          <div className="musicPlay--right">
            <SubMusic data={nextWillPlay()} notHover={true} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
