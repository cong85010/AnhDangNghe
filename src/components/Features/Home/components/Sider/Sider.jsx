import React, { useEffect, useState, useContext } from "react";
import {
  HomeOutlined,
  VideoCameraOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./Sider.scss";
import { Link } from "react-router-dom";
import { ModalTheme } from "../Header/Header";
import { MusicPlayerContext } from "components/contextAPI/context";
import { useMediaQuery } from "react-responsive";
const { Sider } = Layout;

export const Home_Sider = ({ collapsed }) => {
  const [showModal, setShowModal] = useState(false);
  const isTable = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const { username } = useContext(MusicPlayerContext);
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
      <Menu
        className="menu"
        mode="inline"
        defaultSelectedKeys={[window.location.pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
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

        <Menu.Item key="/top-chart" icon={<LineChartOutlined />}>
          <Link to="/top-chart">Đồ thị xếp hạng</Link>
        </Menu.Item>
        <Menu.Item key="/my-music" icon={<UserOutlined />}>
          <Link to="/my-music">Cá nhân</Link>
        </Menu.Item>
      </Menu>
      <ModalTheme stateShowModal={{ showModal, setShowModal }} />
    </Sider>
  );
};

export default Home_Sider;
