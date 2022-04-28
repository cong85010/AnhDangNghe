import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import "./index.scss";
import HomeSlider from "./components/Slider/Slider";
import MusicSquare from "./components/Music/Music_Square/MusicSquare";
import { MusicPlayerContext } from "components/contextAPI/context";
import axios from "axios";
import { options } from "App";
import NhacCuaTui from "nhaccuatui-api-full";

const { Content } = Layout;

export default function HomeRoutes() {
  const [dataBanner, setdataBanner] = useState([]);
  const [topic, setTopic] = useState([]);
  const [data, setData] = useState(null);
  //  NhacCuaTui.getTopicDetail("weiwjycnu").then((response) => {
  //       console.log(response.topic);
  //       setlistTop100V2(response.topic);
  //     });
  useEffect(() => {
    // axios(options("databanner")).then((response) =>
    //   setdataBanner(response.data)
    // );
    if (!topic || topic?.length === 0) {
      NhacCuaTui.getTopics().then((res) => setTopic(res.topic?.splice(0, 1)));
    }
    NhacCuaTui.getHome().then((res) => setData(res));
  }, []);
  console.log(data);
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
      }}
    >
      {data && <HomeSlider dataBanner={data.newRelease} />}

      {data?.topic?.map((e) => (
        <MusicSquare title={e.title} keyFetch={e.key} />
      ))}

      {/* {listTop100 && (
        <MusicSquare title="Nhạc dành cho bạn" dataTopMusic={listTop100} />
      )}
      {listTop100 && (
        <MusicSquare title="Nhạc dành cho toi" dataTopMusic={listTop100V2} />
      )}
      {listTop100 && (
        <MusicSquare title="Nhạc dành cho NYC" dataTopMusic={listTop100V3} />
      )} */}
    </Content>
  );
}
