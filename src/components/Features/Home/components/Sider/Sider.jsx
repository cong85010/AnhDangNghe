import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./Sider.scss";
import { Link } from "react-router-dom";
const { Sider } = Layout;

export const Home_Sider = ({ collapsed }) => {
  return (
    <Sider
      className="Sider"
      trigger={null}
      collapsible
      collapsed={() => collapsed}
    >
      <div className="logo flex-center">
        <Link to="/">{collapsed ? "ADN" : "AnhDangNghe"}</Link>
      </div>
      <Menu className="menu" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Chưa làm
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
        Chưa làm
        </Menu.Item>
      </Menu>
    </Sider>
  );
};


export default Home_Sider;
