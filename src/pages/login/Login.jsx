import React from "react";
import { Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { login, getUserInfo } from "../../../redux/actions/authActions";
const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const response = await dispatch(
      login({ username: "andile", password: "WOZUBERLIN_2025", reset: 0 })
    );

    console.log(response);
  };
  const handleGetUser = async () => {
    const response = await dispatch(getUserInfo("test"));
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
    // backgroundColor: "#4096ff",
  };
  const contentStyle = {
    backgroundColor: "#4096ff",
    alignItems: "center",
    // display: "flex",
    // justifyContent: "center",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    // backgroundColor: "#4096ff",
  };
  const layoutStyle = {
    overflow: "hidden",
    // width: "calc(50% - 8px)",
    // maxWidth: "calc(50% - 8px)",
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 48,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            layout="vertical"
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
            layout="vertical"
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
