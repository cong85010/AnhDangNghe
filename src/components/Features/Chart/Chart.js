import React, { useContext, useEffect, useState } from "react";
import { Line, TinyLine } from "@ant-design/charts";
import "./chart.scss";
import axios from "axios";
import { options } from "App";
import moment from "moment";
import { List, Avatar, Button, Skeleton } from "antd";
import { Duration } from "components/Features/Album/Album";
import { MusicPlayerContext } from "components/contextAPI/context";
const colorTop1 = "rgb(235, 57, 57)";
const colorTop2 = "rgb(62, 247, 155)";
const colorTop3 = "rgb(230, 198, 14)";
export default function Chart() {
  const COUNT = 10;
  // const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const THREE_LINE = 3; // 3 songs
  const { saveMusic } = useContext(MusicPlayerContext);
  const [list, setList] = useState();
  const [showMusic, setShowMusic] = useState(COUNT);
  useEffect(() => {
    axios(options("dataDefault")).then((res) => setList(res.data.songs));
    axios(options("chart")).then((response) => {
      const arr = response.data;
      let date = moment().format("DD-MM-YYYY");
      const length = arr.length;
      for (let i = length - 1; i >= 0; i -= THREE_LINE) {
        arr[i].date = date;
        arr[i - 1].date = date;
        arr[i - 2].date = date;
        //convert today from 15 days ago
        date = moment(date, "DD-MM-YYYY")
          .subtract(1, "days")
          .format("DD-MM-YYYY");
      }
      setData(arr);
    });
  }, []);
  let viewDown = 0;
  const sumViewTop = (index) => {
    let sum = 0;
    if (index <= 3) {
      const top = "top" + index;
      sum = data.reduce((sum, cur) => {
        return cur.type === top ? sum + cur.value : sum;
      }, 0);
    } else {
      sum = Math.max(viewDown - Math.floor(Math.random() * 3000), 0);
    }
    viewDown = sum;
    return sum;
  };

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShowMusic((e) => e + 10);
      setLoading(false);
    }, 1000);
  };
  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button type="primary" onClick={onLoadMore}>
        Xem thêm
      </Button>
    </div>
  ) : null;
  return (
    <div className="chart">
      <ChartLine data={data} />
      <List
        className="demo-loadmore-list chart__rank"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list?.slice(0, showMusic)}
        renderItem={(item, index) => (
          <List.Item
            size="large"
            actions={[
              <a key="list-loadmore-edit" onClick={() => saveMusic(item)}>
                Nghe ngay
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <div className="rank flex-center">
                <h2 className={index < 3 ? `top${index + 1}` : ""}>
                  {index + 1}
                </h2>
              </div>
              <List.Item.Meta
                className="flex-center listItem"
                avatar={
                  <Avatar
                    size="large"
                    className="ant-avatar-50px"
                    src={item.avatar}
                  />
                }
                title={
                  <h5
                    className={`title ${index < 3 ? `title${index + 1}` : ""}`}
                  >
                    {item.title}
                  </h5>
                }
                description={item.creator}
              />
              <div className="duration">
                <Duration props={item} />
              </div>
              <div className="duration">{sumViewTop(index + 1)}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}
const ChartLine = React.memo(function line({ data }) {
  const config = {
    data: data,
    xField: "date",
    yField: "value",
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return "".concat(v);
        },
      },
      title: {
        text: "View",
        style: { fontSize: 16 },
      },
    },
    seriesField: "title",
    color: function color(_ref) {
      const { title } = _ref;
      return title === "Muộn rồi mà sao còn"
        ? colorTop1
        : title === "Thê lương"
        ? colorTop2
        : colorTop3;
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
});
