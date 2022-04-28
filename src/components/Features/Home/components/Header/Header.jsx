import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Upload,
  Button,
  Card,
  Input,
  Layout,
  message,
  Spin,
  Tooltip,
} from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  SearchOutlined,
  BoxPlotOutlined,
  UploadOutlined,
  SettingOutlined,
  UserOutlined,
  LeftSquareOutlined,
} from "@ant-design/icons";
import "../Slider/Slider.scss";
import "./Header.scss";
import { Modal, Row, Col } from "antd";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import { MusicPlayerContext } from "components/contextAPI/context";
import { Link, useHistory } from "react-router-dom";

import { options } from "App";
import H5AudioPlayer from "react-h5-audio-player";
import dataDefault from "constants/dataDefault";
const { Header } = Layout;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export const ModalTheme = ({ stateShowModal }) => {
  const { showModal, setShowModal } = stateShowModal;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [backGround, setBackGrounds] = useState([]);
  const { handlebackground, backGrounds } = useContext(MusicPlayerContext);
  useEffect(() => {
    axios(options("changeBackground")).then((response) => {
      setBackGrounds(response.data);
    });
  }, []);

  const handleOk = (bg) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setShowModal(false);
      setConfirmLoading(false);
      handlebackground(bg);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowModal(false);
  };
  return (
    <Modal
      title="Giao diện"
      visible={showModal}
      onCancel={handleCancel}
      className={`HomeSliderModal HeaderModal ${backGrounds.className}`}
    >
      {confirmLoading && <Spin />}
      {!backGround.length ? (
        <Spin />
      ) : (
        <div>
          {backGround.map((bg, index) => (
            <Card
              hoverable
              key={index}
              onClick={() => handleOk(bg)}
              cover={<img alt="example" src={bg.src} />}
            >
              <Meta title={bg.title} />
            </Card>
          ))}
        </div>
      )}
    </Modal>
  );
};

const Home_Header = ({ collapsed, clickClose }) => {
  const refHeader = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const { saveMusic, user } = useContext(MusicPlayerContext);
  const props = {
    beforeUpload: (file) => {
      if (file.type !== "audio/mpeg") {
        message.error(`${file.name} is not a mp3 file`);
        return;
      }
    },
    onChange: (info) => {
      var file = URL.createObjectURL(info.fileList[0].originFileObj); 
      const audio = new Audio(file)
      const dataAfter  = {
        title: dataDefault.title,
        creator: dataDefault.creator,
        avatar: dataDefault.avatar,
        music: audio.src
      }
      saveMusic(dataAfter)
    },
  };

  return (
    <div ref={refHeader}>
      <Header id="header" className={`header`}>
        <Row>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          
            <div className="logo flex-center">
              <Link to="/">{collapsed ? "ADN" : "AnhDangNghe"}</Link>
            </div>
          </Col>
          <Col xs={0} sm={0} md={2} lg={2} xl={2}>
            <Tooltip title={collapsed ? "Mở rộng" : "Thu nhỏ"}>
              <Button
                className="trigger colorBody"
                shape="circle"
                outline="true"
                type="ghost"
                onClick={clickClose}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              ></Button>
            </Tooltip>
          </Col>
          <Col xs={0} sm={0} md={2} lg={2} xl={2}>
          </Col>

          <Col
            xs={{ span: 17, push: 3 }}
            sm={{ span: 17, push: 3 }}
            md={10}
            lg={10}
            xl={10}
          >
            <Input
              className="colorBody input"
              placeholder="Nhập tên bài hát, ca sĩ..."
              prefix={<SearchOutlined />}
            />
          </Col>

          <Col
            xs={0}
            sm={0}
            md={{ span: 6, offset: 4 }}
            lg={{ span: 5, offset: 5 }}
            xl={{ span: 4, offset: 6 }}
          >
            <Row>
              <Col span={6}>
                <Tooltip className="colorBody" title="Chủ đề">
                  <Button
                    shape="circle"
                    outline="true"
                    type="ghost"
                    icon={<BoxPlotOutlined />}
                    onClick={() => setShowModal(!showModal)}
                    className="colorBody"
                  />
                </Tooltip>
                <ModalTheme stateShowModal={{ showModal, setShowModal }} />
              </Col>
              <Col span={6}>
                <Tooltip className="colorBody" title="Tải lên">
                  <Upload {...props} showUploadList={false} listType="audio" maxCount={1} >
                    <Button
                      shape="circle"
                      outline="true"
                      type="ghost"
                      className="colorBody"
                      icon={<UploadOutlined />}
                    />
                  </Upload>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip className="colorBody" title="Cài đặt">
                  <Button
                    shape="circle"
                    outline="true"
                    type="ghost"
                    icon={<SettingOutlined />}
                  />
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip className="colorBody" title={user.username}>
                  <Link to={user.status ? "/my-music" : "/login"}>
                    <Button
                      shape="circle"
                      outline="true"
                      type="ghost"
                      className="buttonUser"
                      icon={<img src={user.avatar} alt="avt" />}
                    ></Button>
                  </Link>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

export default Home_Header;
