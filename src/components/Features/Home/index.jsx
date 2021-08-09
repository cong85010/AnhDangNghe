import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Home_Sider } from "../Home/components/Sider/Sider";
import Home_Header from "./components/Header/Header";
import "./index.scss";
import ListMusic from "./components/Music/Music_Right/ListMusic";
import Home_Slider from "./components/Slider/Slider";
import dataBanner from "constants/fakeData";
import MusicSquare from "./components/Music/Music_Square/MusicSquare";
import MusicPlay from "./components/Music/MusicPlay/MusicPlay";
import { dataMusics } from "constants/top100.json";
import {
  MusicProvider,
  MusicPlayerContext,
} from "components/contextAPI/context";

const { Content } = Layout;

export default function HomeRoutes() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed);
  const [danhSachPhat, setdanhSachPhat] = useState([]);
  const data = dataBanner;
  const [playing, setPlaying] = useState({
    title: "Thê Lương",
    creator: "Phúc Chinh",
    music:
      "https://aredir.nixcdn.com/NhacCuaTui1012/TheLuong-PhucChinh-6971140.mp3?st=5B9F9b7YAW_S9WIx5RhrUA&e=1628283282",
    url: "https://www.nhaccuatui.com/bai-hat/the-luong-phuc-chinh.nmxw6tXZyBQy.html",
    lyric: "https://lrc-nct.nixcdn.com/2021/03/22/2/8/d/4/1616360845396.lrc",
    bgImage: "",
    avatar:
      "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg",
    coverImage:
      "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg",
  });
  console.log(dataMusics);
  console.log(danhSachPhat);
  useEffect(() => {
    if (dataMusics.length !== 0) {
      setdanhSachPhat (dataMusics.splice(0, 50))
    }
  }, [dataMusics]);
  const saveMusic = (music) => {
    setPlaying(music);
    console.log(music);
  };
  return (
    <MusicProvider value={{ musicPlay: playing, saveMusic }}>
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
            <Home_Slider dataBanner={dataBanner} />
            <MusicSquare title="Top 100 nhac chu tinh" dataTopMusic={data} />
          </Content>
        </Layout>
        <ListMusic listData_Current={danhSachPhat} listData_History={data} />
      </Layout>
      <MusicPlay />
    </MusicProvider>
  );
}
