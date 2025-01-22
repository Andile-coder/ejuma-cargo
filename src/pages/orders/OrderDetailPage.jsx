import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Modal,
  Popconfirm,
  Radio,
  Table,
  message,
} from "antd";
import { notification } from "antd";
import { Badge, Descriptions } from "antd";
import {
  createOrderShipment,
  deleteOrderById,
  getOrderById,
} from "../../../redux/actions/orderActions";
import { warehouseActions } from "../../../redux/slices/warehouseSlice";
import { getWarehouses } from "../../../redux/actions/warehouseActions";

const OrderDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = params.id;
  const order = useSelector((state) => state.order.order);
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    <WareHouseList order_id={orderId} />
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (e) => {
    let newdata = e;
    newdata.date = Math.floor(Date.now() / 1000);
    console.log(newdata);
    setConfirmLoading(true);
    setModalText("creating shipment.....");
    const response = await dispatch(
      createOrderShipment({ id: orderId, warehouse_id: 1 })
    );
    if (response.status == 200) {
      setModalText("shipment Created Succesfully");
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setModalText(<WareHouseList order_id={orderId} />);
      }, 2000);
    } else {
      setModalText(response.response.data.error.message);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
    setModalText(<WareHouseList order_id={orderId} />);
  };

  const getCommonHandler = async () => {
    await dispatch(getOrderById(orderId));
  };
  const confirm = async () => {
    const response = await dispatch(deleteOrderById(orderId));
    console.log("delete response", response);
    if (response.status == 200) {
      api.success({
        message: "Delete Successful!",
        description: `${response.data.success.message}`,
      });

      setTimeout(function () {
        navigate("/orders");
      }, 2000);
    } else {
      api.error({
        message: "Delete Successful!",
        description: `${response.data.success.message}`,
      });
    }
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const items = [
    {
      key: "1",
      label: "Ref Order:",
      children: `${order.ref}`,
    },
    {
      key: "2",
      label: "Third Party",
      children: `${order.socid}`,
    },

    {
      key: "4",
      label: "Description",
      children: `${order.description}`,
    },
    {
      key: "5",
      label: "Country Code",
      children: `${order.country_code}`,
      span: 2,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text={order.statut} />,
      span: 3,
    },
    {
      key: "7",
      label: "Phone",
      children: `${order.phone}`,
    },
    {
      key: "8",
      label: "Date Creation",
      children: `${order.date_creation}`,
      span: 3,
    },
    {
      key: "10",
      label: "Products",
      span: "filled",
      children: order.lines?.map((line) => (
        <>
          {line.ref}
          <br />
        </>
      )),
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "ref",
      key: "ref",
    },

    {
      title: "Qty Ordered",
      dataIndex: "qty",
      key: "ref_customer",
    },

    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (_, record) => `${record.weight} KG`,
    },
  ];
  useEffect(() => {
    getCommonHandler();
  }, []);

  return (
    <div>
      {contextHolder}
      <h1></h1>
      <Descriptions title={order.ref} bordered items={items} />
      <div style={{ margin: "40px 0px" }}>
        <h1>Order Lines</h1>
      </div>

      <Table columns={columns} dataSource={order.lines} />
      <Popconfirm
        title="Delete Order"
        description="Are you sure to delete this order?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button color="danger" variant="solid">
          Delete
        </Button>
      </Popconfirm>

      <Modal
        title="Choose Warehouse"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        {modalText}
      </Modal>
      <Flex gap="small" justify="space-between">
        <Button type="primary" onClick={showModal}>
          Create Shipment
        </Button>
      </Flex>
    </div>
  );
};

export default OrderDetailPage;

const WareHouseList = ({ order_id }) => {
  const [value, setValue] = useState(1);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const handleCreateShipment = async (e) => {
    e.id = order_id;
    console.log(e);
    await dispatch(
      createOrderShipment({ id: e.id, warehouse_id: e.warehouse_id })
    );
  };
  useEffect(() => {
    dispatch(getWarehouses());
  }, []);
  return (
    <Form onFinish={handleCreateShipment}>
      <Form.Item
        name="warehouse_id"
        rules={[
          {
            required: true,
            message: "Warehouse field required!",
          },
        ]}
      >
        <Radio.Group
          style={style}
          onChange={onChange}
          value={value}
          options={warehouses?.map((wh) => ({ value: wh.id, label: wh.ref }))}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Shipment
        </Button>
      </Form.Item>
    </Form>
  );
};
