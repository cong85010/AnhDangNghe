import { Button, Card, Col, Row, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SubMusicSquare.scss";
import { ShimmerPostItem } from "react-shimmer-effects";
import Default from "constants/dataDefault";
import {
  HeartOutlined,
  PlayCircleOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
import { removeVietnameseTones } from "constants/convertVI";

const SubMusicSquare = ({ data, circle = false }) => {
  const { handleNewDSP, danhSachPhat } = useContext(MusicPlayerContext);
  const { key, title = Default.Title, avatar = Default.Url, thumbnail } = data;
  console.log(data);
  const history = useHistory();
  const activeCircle = () =>
    avatar === danhSachPhat.avatar ? "circleImage animateRotate" : "";
  console.log(removeVietnameseTones(title))
  return (
    <div
      className={`
    SubMusicSquare 
    ${circle && activeCircle()}
    `}
    >
      {key ? (
        <>
          <Card
            hoverable
            className="SubMusic"
            cover={
              <img
                alt={title}
                src={thumbnail}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Default.avatar;
                }}
              />
            }
            onClick={() =>
              history.push({
                pathname: `/album/${removeVietnameseTones(title)}`,
                state: { key: key },
              })
            }
          >
            <div className="overlay"></div>
            <div className="SubMusic__items">
              <Row justify="space-around">
                <Col span={5}>
                  <Tooltip title="Thích" className="flex-center">
                    {" "}
                    <Button
                      shape="circle"
                      outline="true"
                      type="text"
                      icon={<HeartOutlined />}
                    />
                  </Tooltip>
                </Col>
                <Col span={5} className="ft30">
                  <Tooltip title="Phát nhạc" className="flex-center">
                    {" "}
                    <Button
                      shape="circle"
                      outline="true"
                      type="text"
                      icon={<PlayCircleOutlined />}
                      onClick={() => handleNewDSP(data)}
                    />
                  </Tooltip>
                </Col>
                <Col span={5}>
                  <Tooltip title="Xem thêm" className="flex-center">
                    {" "}
                    <Button
                      shape="circle"
                      outline="true"
                      type="text"
                      icon={<DashOutlined />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </div>
          </Card>
          <Link
            to={{
              pathname: `/album/${removeVietnameseTones(title)}`,
              state: { key: key },
            }}
          >
            <Meta title={title} tca />
          </Link>
        </>
      ) : (
        <ShimmerPostItem card title />
      )}
    </div>
  );
};

export default SubMusicSquare;
