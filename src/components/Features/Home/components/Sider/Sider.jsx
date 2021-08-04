import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./Sider.scss";
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
        {collapsed ? "ADN" : "AnhDangNghe"}
      </div>
      <Menu className="menu" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};


export default Home_Sider;
