import React, { useState } from "react";
import { Layout } from "antd";
import {Home_Sider} from '../Home/components/Sider/Sider'
import Home_Header from "./components/Header/Header";
import './index.scss'
import ListMusic from "./components/Music/Music_Right/ListMusic";
import Home_Slider from "./components/Slider/Slider";
import dataDangNghe  from 'constants/fakeData';
import MusicSquare from "./components/Music/Music_Square/MusicSquare";
import MusicPlay from "./components/Music/MusicPlay/MusicPlay";

const { Content } = Layout;
export default function HomeRoutes() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed) 
  const {dataBanner} = []
  const data = dataDangNghe

  return (
    <>
    <Layout>
      <Home_Sider collapsed={collapsed} />
      <Layout className="site-layout">
        <Home_Header collapsed={collapsed} clickClose={clickClose} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
        <Home_Slider dataBanner={dataDangNghe} />
        <MusicSquare title ='Top 100 nhac chu tinh' dataTopMusic={data}/>
        </Content>
      </Layout>
      <ListMusic listData_Current={data} listData_History={data}/>
    </Layout>
          <MusicPlay musicPlay={data}/>
    </>

  );
}
