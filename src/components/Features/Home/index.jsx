import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import "./index.scss";
import HomeSlider from "./components/Slider/Slider";
import MusicSquare from "./components/Music/Music_Square/MusicSquare";
import { MusicPlayerContext } from "components/contextAPI/context";
import axios from "axios";
import { options } from "App";

const { Content } = Layout;

export default function HomeRoutes() {
  const { listTop100, listTop100V2,listTop100V3 } = useContext(MusicPlayerContext);
  const [dataBanner, setdataBanner] = useState([])

  useEffect(() => {
      axios(options("databanner")).then((response) => setdataBanner(response.data))
  }, [])
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
      }}
    >
      {dataBanner && <HomeSlider dataBanner={dataBanner} />}
      {listTop100 && (
        <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
      )}
      {listTop100 && (
        <MusicSquare title="Nhạc dành cho toi" dataTopMusic={listTop100V2} />
      )}
      {listTop100 && (
        <MusicSquare title="Nhạc dành cho NYC" dataTopMusic={listTop100V3} />
      )}
    </Content>
  );
}
