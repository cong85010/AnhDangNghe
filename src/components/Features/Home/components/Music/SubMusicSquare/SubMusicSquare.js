import { Button, Card, Col, Row, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SubMusicSquare.scss";
import Default from "constants/dataDefault";
import {
  HeartOutlined,
  PlayCircleOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { MusicPlayerContext } from "components/contextAPI/context";
const SubMusicSquare = ({ data, circle = false}) => {
  const { handleNewDSP, danhSachPhat } = useContext(MusicPlayerContext);
  const { id, title = Default.Title, avatar = Default.Url} = data;
  const history = useHistory()
  const activeCircle = () => avatar === danhSachPhat.avatar?'circleImage animateRotate': ''
  
  return (
    <div className={`
    SubMusicSquare 
    ${circle && activeCircle()}
    `}>
      <Card
        hoverable
        className="SubMusic"
        cover={<img alt={title} src={avatar} />}
        onClick={() => history.push(`/album/${id}`)}
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
                  onClick={() => handleNewDSP(data)}
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
      <Link to={`/album/${id}`}>
        <Meta title={title} />
      </Link>
    </div>
  );
};

export default SubMusicSquare;
