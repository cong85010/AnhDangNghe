import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "./register.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import { POST_URL } from "App";
import { toast, ToastContainer } from "react-toastify";
import { MusicPlayerContext } from "components/contextAPI/context";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [strongPass, setStrongPass] = useState(0);
  const [loading, setLoading] = useState(false)
  const { handleUser } = useContext(MusicPlayerContext);

  const getIdUser = new Promise((resolve, reject) => {
    axios
      .get(`${POST_URL}users`)
      .then((e) => resolve(e.data.length + 1))
      .catch((e) => reject(e.message));
  });
  const history = useHistory()
  const onFinish = async () => {
    if (strongPass < 2) {
      toast.error("Mật khẩu nên đạt mức 'VỪA'", {
        className: "toast_custom_error",
      });
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      return;
    }
    const id = await getIdUser;
    axios.post(`${POST_URL}users`, { id: id, ...user }).then(
      (e) =>
        e &&
        toast.success("Tạo tài khoảng thành công", {
          className: "toast_custom_succes",
        })
    );
    handleUser(user)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      history.push('home')
    }, 2000);
  };
  const onFinishFailed = (e) => {
    console.log(e);
  };
  //remember pass
  return (
    <div className="login">
      <ToastContainer />
      <h2 className="colorBody flex-center">Đăng ký</h2>
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
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
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
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          hasFeedback
        >
          <Input.Password
            name="password"
            className="colorBody input"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        {user.password && (
          <Form.Item
            className="form_input"
            wrapperCol={{ offset: 8, span: 8 }}
            style={{ margin: "-20px 0 0 0" }}
          >
            <PasswordStrengthBar
             className="colorBarPassword"
              onChangeScore={(e) => setStrongPass(e)}
              shortScoreWord="Bảo mật"
              scoreWords={["Kém", "Yếu", "Vừa", "Mạnh", "Tuyệt"]}
              password={user.password}
            />
          </Form.Item>
        )}
        <Form.Item
          className="form_input"
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng nhập xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                console.log(getFieldValue("password"));
                return Promise.reject(new Error("Không trùng khớp"));
              },
            }),
          ]}
        >
          <Input.Password
            className="colorBody input"
            placeholder="Xác nhận mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit" shape="round">
            Đăng ký
          </Button>
          <span className="colorBody"> hoặc </span>
          <Button type="link" size="small">
            <Link to="/login"> Đăng nhập tại đây</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
