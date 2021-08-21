import React, { useContext } from "react";
import { Layout } from "antd";
import HomeHeader from "./components/Header/Header";
import "./index.scss";
import Home_Slider from "./components/Slider/Slider";
import dataBanner from "constants/fakeData";
import MusicSquare from "./components/Music/Music_Square/MusicSquare";
import { MusicPlayerContext } from "components/contextAPI/context";

const { Content } = Layout;

export default function HomeRoutes() {
  const { listTop100 } = useContext(MusicPlayerContext);
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
      }}
    >
      <Home_Slider dataBanner={dataBanner} />
      <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
      <MusicSquare title="Nhạc dành cho Toi" dataTopMusic={listTop100} />
      <MusicSquare title="Nhạc dành cho Nhac cho" dataTopMusic={listTop100} />
    </Content>
  );
}
