import { Button, Card, Col, Row, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import "./SubMusicSquare.scss";
import Default from "constants/dataDefault";
import {
  HeartOutlined,
  PlayCircleOutlined,
  DashOutlined,
} from "@ant-design/icons";
const SubMusicSquare = ({ data }) => {
  const { title = Default.Title, url = Default.Url } = data;
  return (
    <div className="SubMusicSquare">
      <Card
        hoverable
        className="SubMusic"
        cover={<img alt={title} src={url} />}
      >
        <div className="overlay"></div>
        <div className="SubMusic__items">
          <Row justify="space-around">
            <Col span={5}>
              <Tooltip title="Thích">
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
              <Tooltip title="Phát nhạc">
                <Button
                  shape="circle"
                  outline="true"
                  type="text"
                  icon={<PlayCircleOutlined />}
                />
              </Tooltip>
            </Col>
            <Col span={5}>
              <Tooltip title="Xem thêm">
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
      <Link to="#">
        <Meta title={title} />
      </Link>
    </div>
  );
};

export default SubMusicSquare;
