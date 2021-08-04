import React, { useState } from "react";
import { Layout } from "antd";
import {Home_Sider} from '../Home/components/Sider/Sider'
import Home_Header from "./components/Header/Header";
import './index.scss'
import ListMusic from "./components/Music/Music_Right/ListMusic";
const { Content } = Layout;

export default function HomeRoutes() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed)

  const data = [
    {
      title: 'Day la am nhac 1',
      auth: 'Black c',
      url: 'https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg',
    },
    {
      title: 'Day la am nhac 2',
      auth: 'Black c',
      url: 'https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg',
    },
    {
      title: 'Day la am nhac 3',
      auth: 'Black c',
      url: 'https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg',
    },
    {
      title: 'Day la am nhac 4',
      auth: 'Black c',
      url: 'https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg',
    },
  ]

  return (
    <Layout>
      <Home_Sider collapsed={collapsed} />
      <Layout className="site-layout">
        <Home_Header collapsed={collapsed} clickClose={clickClose} />
        <Content
          className=""
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
      <ListMusic listData_Current={data} listData_History={data}/>
    </Layout>
  );
}
