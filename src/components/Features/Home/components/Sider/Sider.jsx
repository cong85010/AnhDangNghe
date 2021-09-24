import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./Sider.scss";
import { Link } from "react-router-dom";
import { ModalTheme } from "../Header/Header";
import { useMediaQuery } from "react-responsive";
const { Sider } = Layout;

export const Home_Sider = ({ collapsed }) => {
  const [showModal, setShowModal] = useState(false);
  const isTable = useMediaQuery({
    query: "(max-width: 768px)",
  });
  return (
    <Sider
      className="Sider"
      trigger={null}
      collapsible
      collapsed={() => collapsed || isTable}
    >
      <div className="logo flex-center">
        <Link to="/">{collapsed || isTable ? "ADN" : "AnhDangNghe"}</Link>
      </div>
      <Menu className="menu" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        {isTable && (
          <Menu.Item
            key="2"
            onClick={() => setShowModal(!showModal)}
            icon={<VideoCameraOutlined />}
          >
            Chủ đề
          </Menu.Item>
        )}

        <Menu.Item key="3" icon={<UploadOutlined />}>
          Chưa làm
        </Menu.Item>
      </Menu>
      <ModalTheme stateShowModal={{ showModal, setShowModal }} />
    </Sider>
  );
};

export default Home_Sider;
