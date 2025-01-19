import axios from "axios";

import { TbBuildingWarehouse } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCardMembership } from "react-icons/md";
import { GoBriefcase } from "react-icons/go";
import { TbMap2 } from "react-icons/tb";
import { FaTaxi } from "react-icons/fa6";

const config = {
  baseURL: import.meta.env.VITE_DOLIBARR_API_URL,
};
export const axiosInstance = axios.create(config);

export const public_pages = [
  {
    name: "About",
    path: "/about",
    icon: "",
  },
  {
    name: "login",
    path: "/login",
    icon: "",
  },
  {
    name: "pricing",
    path: "/pricing",
    icon: "",
  },
  {
    name: "contacts",
    path: "/contact",
    icon: "",
  },
];

export const private_pages = [
  {
    name: "warehouses",
    path: "/warehouses",
    // icon: <TbBuildingWarehouse />,
  },
  {
    name: "shipments",
    path: "/shipments",
    // icon: <TbTruckDelivery />,
  },
  {
    name: "Products",
    path: "/products",
    // icon: <AiOutlineProduct />,
  },
  {
    name: "members",
    path: "/members",
    // icon: <MdOutlineCardMembership />,
  },
  {
    name: "drivers",
    path: "/drivers",
    // icon: <FaTaxi />,
  },
  {
    name: "jobs",
    path: "/jobs",
    // icon: <GoBriefcase />,
  },
  {
    name: "map",
    path: "/map",
    // icon: <TbMap2 />,
  },
];

// export default axiosInstance;
