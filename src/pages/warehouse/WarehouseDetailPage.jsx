import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteWarehouseById,
  getWarehouseById,
} from "../../../redux/actions/warehouseActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, message } from "antd";
import { notification } from "antd";
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

  useEffect(() => {
    getCommonHandler();
  }, []);

  return (
    <div>
      {contextHolder}
      <h1>warehouse id : {warehouse.id}</h1>

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

      <ul>
        {Object.keys(warehouse).map((key, i) => (
          <p key={i}>
            {key}:{warehouse[key]}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseDetailPage;
