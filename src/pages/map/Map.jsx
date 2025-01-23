import { useEffect } from "react";
import MapContainerCont from "../../components/mapContainer/MapContainerCont";
import { useDispatch } from "react-redux";
import { getWarehouses } from "../../../redux/actions/warehouseActions";
import { commonActions } from "../../../redux/slices/commonSlice";

const Map = () => {
  const dispatch = useDispatch();

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", latitude, longitude);
        console.log([latitude, longitude], 14);
        dispatch(commonActions.setLocation([latitude, longitude]));
      },
      (error) => {
        console.error("Error fetching user location:", error);
        alert("Unable to fetch your location. Please allow location access.");
      }
    );
  };

  const getCommonHandler = async () => {
    await dispatch(getWarehouses());
  };
  useEffect(() => {
    getCommonHandler();
    getUserLocation();
  }, []);
  return (
    <div>
      <MapContainerCont />
    </div>
  );
};

export default Map;
