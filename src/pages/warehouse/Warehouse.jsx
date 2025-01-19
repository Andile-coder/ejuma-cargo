import { useEffect, useState } from "react";
import { Button, Space, Table, Flex, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createWarehouse,
  getWarehouses,
} from "../../../redux/actions/warehouseActions";
import CreateWarehouseForm from "../../components/forms/warehouse/CreateWarehouseForm";
import { notification } from "antd";

const Warehouse = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse?.warehouses);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    <CreateWarehouseForm onSubmit={(e) => handleOk(e)} />
  );
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (e) => {
    console.log(e);
    setConfirmLoading(true);
    setModalText("creating warehouse.....");
    const response = await dispatch(createWarehouse(e));
    if (response.status == 200) {
      setModalText("Warehouse Created Succesfully");
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setModalText(<CreateWarehouseForm onSubmit={(e) => handleOk(e)} />);
      }, 2000);
    } else {
      setModalText(response.response.data.error.message);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
    setModalText(<CreateWarehouseForm onSubmit={(e) => handleOk(e)} />);
  };

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
      <Modal
        title="New Warehouse"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        {modalText}
      </Modal>
      <Flex gap="small" justify="space-between">
        <h1>Warehouses</h1>
        <Button type="primary" onClick={showModal}>
          Create New Warehouse
        </Button>
      </Flex>

      <Table columns={columns} dataSource={warehouses} />
    </div>
  );
};

export default Warehouse;
