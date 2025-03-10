import { useEffect, useState } from "react";
import { Button, Space, Table, Flex, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../../../redux/actions/shipmentActions";
import CreateWarehouseForm from "../../components/forms/warehouse/CreateWarehouseForm";
const Shipments = () => {
  const dispatch = useDispatch();
  const shipments = useSelector((state) => state.shipment?.shipments);
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
      title: "Ref Customer",
      dataIndex: "ref_customer",
      key: "ref_customer",
    },

    {
      title: "Shipping Method",
      dataIndex: "shipping_method",
      key: "shipping_method",
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
          <a href={`/shipments/${record.id}`}>View {record.id}</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  const getCommonHandler = async () => {
    await dispatch(getShipments());
  };
  useEffect(() => {
    getCommonHandler();
  }, []);
  return (
    <div>
      <Flex gap="small" justify="space-between">
        <h1>Shipments</h1>
        <Button type="primary" onClick={showModal}>
          Create New Shipment
        </Button>
      </Flex>

      <Table columns={columns} dataSource={shipments} />
    </div>
  );
};

export default Shipments;
