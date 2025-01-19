import "./App.css";
import "antd/dist/reset.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Button, Layout, theme } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../redux/slices/commonSlice";
import MainSideBar from "./components/sideBar/MainSideBar";

const { Header, Footer, Content } = Layout;
function App({ children, state }) {
  const dispatch = useDispatch();
  const sidebarCollapse = useSelector((state) => state.common.sidebarCollapse);

  const setSidebarCollapse = () => {
    dispatch(commonActions.setSidebarCollape());
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  return (
    <>
      {state == "public" ? (
        <> {children}</>
      ) : (
        <Layout style={layoutStyle}>
          <MainSideBar />
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={
                  sidebarCollapse ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => setSidebarCollapse()}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ejuma Cargo ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default App;
