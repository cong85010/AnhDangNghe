import { Spin, Tabs, Tag, Tooltip } from "antd";
import dataDefault from "constants/dataDefault";
import React, { useContext, useEffect, useRef, useState } from "react";
import SubMusic from "../SubMusic/SubMusic";
import "./ListMusic.scss";
import { BarsOutlined } from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
import InfiniteScroll from "react-infinite-scroll-component";
import NhacCuaTui from "nhaccuatui-api-full";
const { TabPane } = Tabs;

export const ListMusic = ({ listData_History }) => {
  const { playing, handleNewDSP, danhSachPhat } =
    useContext(MusicPlayerContext);
  const [listData, setListData] = useState({
    songs: [],
    hasMore: true,
  });
  useEffect(() => {
    NhacCuaTui.getTop100("m3liaiy6vVsF").then((response) => {
      setListData(response.playlist);
      handleNewDSP(response.playlist);
    });
  }, []);
  useEffect(() => {
    if (danhSachPhat.key !== listData.key) {
      setListData(danhSachPhat);
    }
  }, [danhSachPhat]);
  const fetchData = () => {
    // if (listData.length >= listData_Current.length) {
    //   setListData({ ...listData, hasMore: false });
    // }
    // setTimeout(() => {
    //   if (listData.length + 10 < listData_Current.length) {
    //     setListData({
    //       songs: listData_Current.songs.slice(0, listData.length + 10),
    //       hasMore: true,
    //     });
    //   } else {
    //     setListData({ songs: listData_Current.songs, hasMore: false });
    //   }
    // }, 3000);
  };
  return (
    <div className={`card-container listMusicRight`}>
      <Tabs type="card">
        <TabPane tab="Danh sách phát" key="1">
          <div className="h-30"></div>
          <Tooltip
            mouseEnterDelay="0.7"
            placement="topLeft"
            title={listData?.title}
          >
            <Tag className="fixDanhSach" icon={<BarsOutlined />} color="pink">
              {listData?.title}
            </Tag>
          </Tooltip>
          <InfiniteScroll
            dataLength={listData?.songs.length || 5} //This is important field to render the next data
            next={fetchData}
            hasMore={listData?.hasMore}
            loader={<Spin className="flex-center" />}
            height="calc(100vh - 130px)"
            className={`scroll ${playing?.title && "h__200px"}`}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b className="colorBody">Yay! You have seen it all</b>
              </p>
            }
          >
            {listData?.songs.map((data, index) => (
              <SubMusic key={index} data={data} />
            ))}
          </InfiniteScroll>
        </TabPane>
        <TabPane tab="Nghe gần đây" key="2">
          {listData_History.map((data, index) => (
            <SubMusic key={index} data={data} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ListMusic;
