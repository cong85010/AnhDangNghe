import React, { useContext } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./MusicPlay.scss";
import { Button, Col, Dropdown, Menu, notification, Row, Tooltip } from "antd";
import SubMusic from "../SubMusic/SubMusic";

import {
  HeartOutlined,
  DownloadOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
export default function MusicPlay({nextPrePlayingMusic, nextWillPlay }) {

  const { playing, isPlay, setIsPlay} = useContext(MusicPlayerContext);
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

          />
        </Col>
        <Col span={1}>
          <div className="musicPlay--right musicPlay--left">
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
        <Col span={5}>
          <div className="musicPlay--right">
            <SubMusic data={nextWillPlay()} notHover= {true}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}
