import { useEffect } from "react";
import MapContainerCont from "../../components/mapContainer/MapContainerCont";
import { useDispatch } from "react-redux";
import { getWarehouses } from "../../../redux/actions/warehouseActions";

const Map = () => {
  const dispatch = useDispatch();

  const getCommonHandler = async () => {
    await dispatch(getWarehouses());
  };
  useEffect(() => {
    getCommonHandler();
  }, []);
  return (
    <div>
      <MapContainerCont />
    </div>
  );
};

export default Map;
