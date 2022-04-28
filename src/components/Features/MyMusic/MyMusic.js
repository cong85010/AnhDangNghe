import { Col, Row, Upload, Tooltip, Spin, Button, Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "./MyMusic.scss";
import { MusicPlayerContext } from "components/contextAPI/context";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import { options, POST_URL, USER_DEFAULT } from "App";
import { toast, ToastContainer } from "react-toastify";
import avatarUser from "assets/images/gamer.png";
import { LogoutOutlined } from "@ant-design/icons";
import { Duration } from "../Album/Album";
import { useHistory } from "react-router-dom";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function MyMusic() {
  const { user, handleUser, saveMusic, handleNewDSP, playing } =
    useContext(MusicPlayerContext);
  const [loading, setLoading] = useState(false);
  const [file, setfile] = useState(null);
  const [ablum, setAblum] = useState({ title: "default", songs: [] });
  const history = useHistory();
  useEffect(() => {
    setAblum({
      title: "default",
      songs: JSON.parse(localStorage.getItem("ngheganday")) || [],
    });
  }, [playing]);
  const handlePreview = async () => {
    if (!file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj);
      const obj = { ...user, avatar: preview };
      handleUser(obj);
      setLoading(true);
      setTimeout(() => {
        if (user.status) {
          axios.put(`${POST_URL}users/${user.id}`, { ...obj }).then((e) => {
            if (e.status) {
              toast.success("Thay đổi ảnh thành công", {
                className: "toast_custom_succes",
              });
              localStorage.setItem("user", JSON.stringify(obj) || USER_DEFAULT);
            }
          });
        } else {
          localStorage.setItem("user", JSON.stringify(obj) || USER_DEFAULT);
          toast.success("Thay đổi ảnh thành công", {
            className: "toast_custom_succes",
          });
        }
        setLoading(false);
      }, 1000);
    }
    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle:
    //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    // });
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    if (file != null) {
      handlePreview();
    }
  }, [file?.uid]);
  const columns = [
    {
      title: "No",
      key: "index",
      width: "50px",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "avatar",
      width: "70px",
      render: (t, r) => (
        <img
          src={t}
          alt="img"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = Default.avatar;
          }}
        />
      ),
    },
    {
      dataIndex: ["title", "creator"],
      render: (text, row) => (
        <div>
          <p className="m-0">{row["title"]}</p>
          <small className="opacity-0_5">{row["creator"]}</small>
        </div>
      ),
    },
    {
      title: "Time",
      maxWidth: "200px",
      render: (t, r) => <Duration props={t} />,
    },
  ];
  const handleplay = (r, t) => {
    handleNewDSP(ablum);
    saveMusic(r);
  };
  const handleLogOut = () => {
    handleUser(USER_DEFAULT);
    setfile(null);
    toast.success("Đăng xuất thành công", {
      className: "toast_custom_succes",
    });
  };
  return (
    <div className="myMusic">
      <ToastContainer />
      <Row justify="center">
        <Col span={24} className="flex-center myMusic__margin">
          {user.status ? (
            <Tooltip title="Đăng xuất">
              <Button
                className="myMusic__margin__logout colorBody"
                shape="circle"
                outline="true"
                type="ghost"
                onClick={handleLogOut}
                icon={<LogoutOutlined />}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Đăng nhập">
              <Button
                className="myMusic__margin__logout colorBody"
                shape="circle"
                outline="true"
                type="ghost"
                onClick={() => history.push("/login")}
                icon={<LoginOutlined />}
              />
            </Tooltip>
          )}
          <div className="myMusic__avatar">
            <Tooltip title="Thay đổi ảnh">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={
                  loading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <img src={user.avatar || avatarUser} alt="avt" />
                  )
                }
                className="avatar"
              />
            </Tooltip>
            <Upload
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              // fileList={fileList}
              //   onPreview={(e) => handlePreview(e)}
              onChange={(e) => setfile(e.file)}
              className="avatar_upload"
              maxCount={1}
            >
              _
            </Upload>
          </div>
        </Col>
        <Col span={24}>
          <h1 className="flex-center colorBody big_title">{user.username}</h1>
        </Col>
        <Col span={24} className="album">
          <h2 className="colorBody">Bạn nghe gần đây</h2>
          <Table
            id="scrollTop"
            columns={columns}
            dataSource={ablum.songs}
            pagination={false}
            onRow={(r, t) => {
              return { onClick: () => handleplay(r, t) };
            }}
            scroll={{ y: "50%" }}
          />
        </Col>
      </Row>
    </div>
  );
}
