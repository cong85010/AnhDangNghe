import { Tabs, Tag, Tooltip } from "antd";
import dataDefault from "constants/dataDefault";
import React, { useContext, useEffect, useRef } from "react";
import SubMusic from "../SubMusic/SubMusic";
import './ListMusic.scss'
import { BarsOutlined } from '@ant-design/icons';
import { MusicPlayerContext } from "components/contextAPI/context";

const { TabPane } = Tabs;

export const ListMusic = ({ listData_Current, listData_History }) => {
  const { isPlay } = useContext(MusicPlayerContext);

  return (
    <div className={`card-container listMusicRight ${isPlay && '__200px'}`} >
      <Tabs type="card" className="scroll">
        <TabPane tab="Danh sách phát" key="1">
          <div className='h-30'></div>
          <Tooltip mouseEnterDelay='0.7'
            placement="topLeft"
            title={listData_Current.title}>
            <Tag
              className="fixDanhSach"
              icon={<BarsOutlined />}
              style={
                {
                  fontSize: 16,
                  padding: '5px 10px',
                  width: '100%',
                  fontWeight: 'bold'
                }}
              color="pink"> {listData_Current.title}</Tag></Tooltip>
          {
            listData_Current.songs.map((data, index) => (
              <SubMusic key={index} data={data} />
            ))}
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
