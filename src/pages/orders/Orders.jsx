import { useEffect, useState } from "react";
import { Button, Space, Table, Flex, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrders } from "../../../redux/actions/orderActions";
import CreateOrderForm from "../../components/forms/order/CreateOrderForm";
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.orders);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    <CreateOrderForm onSubmit={(e) => handleOk(e)} />
  );

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (e) => {
    let newdata = e;
    newdata.date = Math.floor(Date.now() / 1000);
    console.log(newdata);
    setConfirmLoading(true);
    setModalText("creating warehouse.....");
    const response = await dispatch(createOrder(e));
    if (response.status == 200) {
      setModalText("Order Created Succesfully");
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setModalText(<CreateOrderForm onSubmit={(e) => handleOk(e)} />);
      }, 2000);
    } else {
      setModalText(response.response.data.error.message);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
    setModalText(<CreateOrderForm onSubmit={(e) => handleOk(e)} />);
  };
  const columns = [
    {
      title: "Ref",
      dataIndex: "ref",
      key: "ref",
    },

    {
      title: "Ref Customer",
      dataIndex: "ref_customer",
      key: "ref_customer",
    },

    {
      title: "Third Party",
      dataIndex: "socid",
      key: "third_party",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/orders/${record.id}`}>View {record.id}</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  const getCommonHandler = async () => {
    await dispatch(getOrders());
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
        <h1>Orders</h1>
        <Button type="primary" onClick={showModal}>
          Create New order
        </Button>
      </Flex>

      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default Orders;
