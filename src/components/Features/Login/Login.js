import React, { useContext, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./login.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MusicPlayerContext } from "components/contextAPI/context";
import axios from "axios";
import { POST_URL } from "App";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function LoginUser() {
  const [user, setUser] = useState({
    status: true,
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { handleUser } = useContext(MusicPlayerContext);
  const history = useHistory();
  const onFinish = async () => {
    setLoading(true);
    axios
      .get(`${POST_URL}users`, {
        params: user,
      })
      .then((res) => {
        const e = res?.data[0];
        if (e.username === user.username && e.password === user.password) {
          toast.success("Đăng nhập thành công", {
            className: "toast_custom_succes",
          });
          handleUser({...e, ...user});
          localStorage.setItem('user', JSON.stringify({...e, ...user}))
          setTimeout(() => {
            setLoading(false);
            history.push("/");
          }, 1500);
        } else {
          toast.error("Sai tài khoản hoặc mật khẩu", {
            className: "toast_custom_error",
          });
        }
      })
      .catch((e) =>
        toast.error("Sai tài khoản hoặc mật khẩu", {
          className: "toast_custom_error",
        })
      );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onFinishFailed = (e) => {
    console.log(e);
  };
  return (
    <div className="login">
      <ToastContainer />
      <h2 className="colorBody flex-center">Đăng nhập</h2>
      <Form
        className="form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="form_input"
          label="Username"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          vali
        >
          <Input
            className="colorBody input"
            placeholder="Tên đăng nhập"
            prefix={<UserOutlined />}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          className="form_input"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password
            className="colorBody input"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          className="form_input"
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            shape="round"
          >
            Đăng nhập
          </Button>
          <span className="colorBody"> hoặc </span>
          <Button type="link" size="small">
            <Link to="/register"> Đăng ký tại đây</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
