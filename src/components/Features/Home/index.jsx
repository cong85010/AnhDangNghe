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
import {Top100} from "constants/top100NhacViet.json"
import { MusicProvider } from "components/contextAPI/context";

const { Content } = Layout;

export default function HomeRoutes() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed);
  const [danhSachPhat, setdanhSachPhat] = useState([]);
  const [listTop100, setlistTop100] = useState([]);
  const [ngheGanDay, setngheGanDay] = useState([]);
  const [playing, setPlaying] = useState({ title: "closeMusicPlaying" });
  const saveMusic = (music) => {
    const indexMusic = ngheGanDay.findIndex(
      (item) => item.music === music.music
    );
    if (indexMusic !== -1) {
      ngheGanDay.splice(indexMusic, 1);
    }
    localStorage.setItem("ngheganday", JSON.stringify([music, ...ngheGanDay]));
    setPlaying(music);
  };
console.log(listTop100)
  useEffect(() => {
    if (dataMusics.length !== 0) {
      setdanhSachPhat(
        dataMusics.filter((music) => !music.music.includes("f9-stream.nixcdn"))
      );
    }
    if (Top100.length !== 0) {
      setlistTop100(
        Top100
      );
    }
    setngheGanDay(JSON.parse(localStorage.getItem("ngheganday")) || []);
  }, [dataMusics, Top100]);
  useEffect(() => {
    setngheGanDay(JSON.parse(localStorage.getItem("ngheganday")) || []);
  }, [playing]);
  const nextPlayingMusic = () => {
    const indexMusic = danhSachPhat.findIndex(
      (music) => music.music === playing.music
    );
    indexMusic >= danhSachPhat.length
      ? setPlaying(danhSachPhat[0])
      : setPlaying(danhSachPhat[indexMusic + 1]);
  };
  const prePlayingMusic = () => {
    const indexMusic = danhSachPhat.findIndex(
      (music) => music.music === playing.music
    );
    indexMusic <= 0
      ? setPlaying(danhSachPhat[0])
      : setPlaying(danhSachPhat[indexMusic - 1]);
  };
  const nextWillPlayingMusic = () => {
    if (danhSachPhat.length > 0) {
      const indexMusic = danhSachPhat.findIndex(
        (music) => music.music === playing.music
      );
      return indexMusic >= danhSachPhat.length
        ? danhSachPhat[0]
        : danhSachPhat[indexMusic + 1];
    }
    return {};
  };
  const handleNewDSP = (newDanhSachPhat) => {
    saveMusic(newDanhSachPhat[0])
    setdanhSachPhat(newDanhSachPhat);
  }
  return (
    <MusicProvider value={{ musicPlay: playing, saveMusic, handleNewDSP }}>
      <Layout>
        <Home_Sider collapsed={collapsed} />
        <Layout className={`site-layout ${playing.music && '__100px'}`}>
          <Home_Header collapsed={collapsed} clickClose={clickClose} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
            }}
            className='content--mid'
          >
            <Home_Slider dataBanner={dataBanner} />
            <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
            <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
            <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
          </Content>
        </Layout>
        <ListMusic
          listData_Current={danhSachPhat}
          listData_History={ngheGanDay}
        />
      </Layout>
      <MusicPlay
        nextPlay={nextPlayingMusic}
        prePlay={prePlayingMusic}
        nextWillPlay={nextWillPlayingMusic}
      />
    </MusicProvider>
  );
}
