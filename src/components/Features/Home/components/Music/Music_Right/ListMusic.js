import { Tabs } from "antd";
import React from "react";
import SubMusic from "../SubMusic/SubMusic";
import './ListMusic.scss'

const { TabPane } = Tabs;

export const ListMusic = ({listData_Current, listData_History }) => {

  return (
    <div className="card-container listMusicRight" >
      <Tabs type="card">
        <TabPane tab="Danh sách phát" key="1">
          {listData_Current.map((data, index) => (
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
