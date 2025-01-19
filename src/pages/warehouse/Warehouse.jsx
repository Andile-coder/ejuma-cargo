import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouses } from "../../../redux/actions/warehouseActions";
const Warehouse = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse?.warehouses);

  const columns = [
    {
      title: "Ref",
      dataIndex: "ref",
      key: "ref",
    },

    {
      title: "Short name of location",
      dataIndex: "lieu",
      key: "lieu",
    },

    {
      title: "Status",
      dataIndex: "statut",
      key: "statut",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/warehouses/${record.id}`}>View {record.id}</a>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const getCommonHandler = async () => {
    await dispatch(getWarehouses());
  };
  useEffect(() => {
    getCommonHandler();
  }, []);
  return (
    <div>
      <h1>Warehouses</h1>
      <Table columns={columns} dataSource={warehouses} />
    </div>
  );
};

export default Warehouse;
