import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Input, Layout, Spin, Tooltip } from "antd";
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
import { Link, useHistory, useRouteMatch } from "react-router-dom";
const { Header } = Layout;

const Home_Header = ({  collapsed, clickClose }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [backGround, setBackGrounds] = useState([]);
  const history = useHistory();
  const refHeader = useRef(null);

  useEffect(() => {}, []);
  // useEffect(() => {
  //     axios.get('http://localhost:3000/changeBackground').then((response) => {
  //           setBackGrounds(response.data)
  //     })
  // }, [])
  const { handlebackground, backGrounds } = useContext(MusicPlayerContext);
  const showModal = () => {
    setVisible(true);
    if (!backGround.length) {
      setTimeout(() => {
        axios.get("http://localhost:3000/changeBackground").then((response) => {
          setBackGrounds(response.data);
        }, 300);
      });
    }
  };

  const handleOk = (bg) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      handlebackground(bg);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  
  return (
    <div ref={refHeader} >
      <Header id="header" className={`header`} >
        <Row>
          <Col span={2}>
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
          <Col span={2}>
            <Tooltip title="Quay lại">
              <Button
                className="colorBody"
                shape="circle"
                outline="true"
                type="ghost"
                onClick={() => history.push("/")}
                icon={<LeftSquareOutlined />}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={10}>
            <Input
              className="colorBody"
              className="input"
              placeholder="Nhập tên bài hát, ca sĩ..."
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={4} offset={6}>
            <Row>
              <Col span={6}>
                <Tooltip className="colorBody" title="Chủ đề">
                  <Button
                    shape="circle"
                    outline="true"
                    type="ghost"
                    icon={<BoxPlotOutlined />}
                    onClick={showModal}
                    className="colorBody"
                  />
                </Tooltip>
                <Modal
                  title="Giao diện"
                  visible={visible}
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
              </Col>
              <Col span={6}>
                <Tooltip className="colorBody" title="Tải lên">
                  <Button
                    shape="circle"
                    outline="true"
                    type="ghost"
                    icon={<UploadOutlined />}
                  />
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
                <Tooltip className="colorBody" title="Người dùng">
                  <Button
                    shape="circle"
                    outline="true"
                    type="ghost"
                    icon={<UserOutlined />}
                  />
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
