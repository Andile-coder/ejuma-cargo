import React from "react";
import { Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Button, Checkbox, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import { login, getUserInfo } from "../../../redux/actions/authActions";
import { Divider, notification, Space } from "antd";
import { useNavigate } from "react-router";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const handleLogin = async (e) => {
    const response = await dispatch(
      login({ username: e.username, password: e.password, reset: 0 })
    );
    if (response.status == 200) {
      api.success({
        message: "Login Successful!",
        description: `${response.data.success.message}`,
      });

      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
    } else {
      api.error({
        message: "Login Failed!",
        description: `${response.response.data.error.message}`,
      });
    }

    console.log(response);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
  };
  const contentStyle = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  return (
    <Layout style={layoutStyle}>
      {contextHolder}
      <Header style={headerStyle}>Ejuma Cargo</Header>
      <Content style={contentStyle}>
        <Form
          name="basic"
          layout="vertical"
          wrapperCol={{}}
          style={{
            width: 400,
            height: 400,
          }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default Login;
