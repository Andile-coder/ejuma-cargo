import { TbBuildingWarehouse } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCardMembership } from "react-icons/md";
import { GoBriefcase } from "react-icons/go";
import { TbMap2 } from "react-icons/tb";
import { FaTaxi } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";

import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const { Sider } = Layout;

const MainSideBar = () => {
  const sidebarCollapse = useSelector((state) => state.common.sidebarCollapse);
  const navigate = useNavigate();

  const onSidebarItemClick = (elem) => {
    navigate(elem.path);
  };
  const private_pages = [
    {
      name: "dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "warehouses",
      path: "/warehouses",
      icon: <TbBuildingWarehouse />,
    },
    {
      name: "shipments",
      path: "/shipments",
      icon: <TbTruckDelivery />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <AiOutlineProduct />,
    },
    {
      name: "members",
      path: "/members",
      icon: <MdOutlineCardMembership />,
    },
    {
      name: "drivers",
      path: "/drivers",
      icon: <FaTaxi />,
    },
    {
      name: "jobs",
      path: "/jobs",
      icon: <GoBriefcase />,
    },
    {
      name: "map",
      path: "/map",
      icon: <TbMap2 />,
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={sidebarCollapse}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={private_pages.map((elem, i) => ({
          key: i,
          label: elem.name,
          icon: elem.icon,
        }))}
        onClick={(elem) => onSidebarItemClick(private_pages[elem.key])}
      />
    </Sider>
  );
};

export default MainSideBar;
