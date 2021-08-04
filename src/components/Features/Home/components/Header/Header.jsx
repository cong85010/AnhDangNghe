import React from "react";
import { Button, Input, Layout, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  SearchOutlined,
  BoxPlotOutlined,
  UploadOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Header.scss";
import { Row, Col } from "antd";

const { Header } = Layout;

const Home_Header = ({ collapsed, clickClose }) => {
  return (
    <Header className="header">
      <Row>
        <Col span={2}>
          {" "}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger colorBody",
              onClick: clickClose,
            }
          )}
        </Col>
        <Col span={10} offset={2}>
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
                />
              </Tooltip>
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
  );
};

export default Home_Header;
