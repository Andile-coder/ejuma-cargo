import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteWarehouseById,
  getWarehouseById,
} from "../../../redux/actions/warehouseActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, message } from "antd";
import { notification } from "antd";
import { Badge, Descriptions } from "antd";

const WarehouseDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const warehouseId = params.id;
  const warehouse = useSelector((state) => state.warehouse.warehouse);
  const [api, contextHolder] = notification.useNotification();

  const getCommonHandler = async () => {
    await dispatch(getWarehouseById(warehouseId));
  };
  const confirm = async () => {
    const response = await dispatch(deleteWarehouseById(warehouseId));

    if (response.status == 200) {
      api.success({
        message: "Delete Successful!",
        description: `${response.data.success.message}`,
      });

      setTimeout(function () {
        navigate("/warehouses");
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
      label: "Label",
      children: `${warehouse.label}`,
    },
    {
      key: "2",
      label: "Short name of location",
      children: `${warehouse.lieu}`,
    },
    {
      key: "3",
      label: "Project",
      children: `${warehouse.fk_project}`,
    },
    {
      key: "4",
      label: "Description",
      children: `${warehouse.description}`,
    },
    {
      key: "5",
      label: "Country Code",
      children: `${warehouse.country_code}`,
      span: 2,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text={warehouse.statut} />,
      span: 3,
    },
    {
      key: "7",
      label: "Phone",
      children: `${warehouse.phone}`,
    },
    {
      key: "8",
      label: "Date Creation",
      children: `${warehouse.date_creation}`,
      span: 3,
    },
    // {
    //   key: "9",
    //   label: "Zip",
    //   children: `${warehouse.address}`,
    // },
    {
      key: "10",
      label: "Address",
      children: (
        <>
          {warehouse.country_code}
          <br />
          {warehouse.town}
          <br />
          {warehouse.address}
          <br />
          {warehouse.zip}
          <br />
        </>
      ),
    },
  ];

  useEffect(() => {
    getCommonHandler();
  }, []);

  return (
    <div>
      {contextHolder}
      <h1></h1>
      <Descriptions title={warehouse.label} bordered items={items} />
      <div style={{ height: "40px" }}></div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
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

export default WarehouseDetailPage;
