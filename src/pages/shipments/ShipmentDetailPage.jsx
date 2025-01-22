import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteWarehouseById,
  getWarehouseById,
} from "../../../redux/actions/warehouseActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { notification } from "antd";
import { Badge, Descriptions } from "antd";
import {
  deleteShipmentById,
  getShipmentById,
} from "../../../redux/actions/shipmentActions";

const ShipmentDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipmentId = params.id;
  const shipment = useSelector((state) => state.shipment.shipment);

  const [api, contextHolder] = notification.useNotification();

  const getCommonHandler = async () => {
    await dispatch(getShipmentById(shipmentId));
  };
  const confirm = async () => {
    const response = await dispatch(deleteShipmentById(shipmentId));

    if (response.status == 200) {
      api.success({
        message: "Delete Successful!",
        description: `${response.data.success.message}`,
      });

      setTimeout(function () {
        navigate("/shipments");
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
      children: `${shipment.ref}`,
    },
    {
      key: "2",
      label: "shipping_method",
      children: `${shipment.shipping_method}`,
    },

    {
      key: "4",
      label: "Description",
      children: `${shipment.description}`,
    },
    {
      key: "5",
      label: "Country Code",
      children: `${shipment.country_code}`,
      span: 2,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text={shipment.statut} />,
      span: 3,
    },
    {
      key: "7",
      label: "Phone",
      children: `${shipment.phone}`,
    },
    {
      key: "8",
      label: "Date Creation",
      children: `${shipment.date_creation}`,
      span: 3,
    },
    // {
    //   key: "9",
    //   label: "Zip",
    //   children: `${warehouse.address}`,
    // },
    {
      key: "10",
      label: "Products",
      span: "filled",
      children: shipment.lines?.map((line) => (
        <>
          {line.ref}
          <br />
        </>
      )),
    },
  ];

  const columns = [
    {
      title: "Products",
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
      <Descriptions title={shipment.ref} bordered items={items} />
      <div style={{ margin: "40px 0px" }}>
        <h1>Products</h1>
      </div>

      <Table columns={columns} dataSource={shipment.lines} />
      <Popconfirm
        title="Delete Shipment"
        description="Are you sure to delete this Shipment?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button color="danger" variant="solid">
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ShipmentDetailPage;
