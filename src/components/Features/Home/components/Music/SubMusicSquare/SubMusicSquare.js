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
const SubMusicSquare = ({ data, circle = false }) => {
  const { handleNewDSP, danhSachPhat } = useContext(MusicPlayerContext);
  const { id, title = Default.Title, avatar = Default.Url, key = "" } = data;
  const history = useHistory()
  const activeCircle = () => avatar === danhSachPhat.avatar ? 'circleImage animateRotate' : ''

  return (
    <div className={`
    SubMusicSquare 
    ${circle && activeCircle()}
    `}>
      {
        id ?
          <>
            <Card
              hoverable
              className="SubMusic"
              cover={<img alt={title} src={avatar} onError={(e)=>{e.target.onerror = null; e.target.src=Default.avatar}}/>}
              onClick={() => history.push(`/album/${key}=${id}`)}
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
            <Link to={`/album/${id}`}>
              <Meta title={title} tca />
            </Link></>
          :
          <ShimmerPostItem card title />
      }
    </div>
  );
};

export default SubMusicSquare;
