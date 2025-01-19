import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { getUserInfo } from "../../../redux/actions/authActions";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const checkUser = async () => {
    console.log(isLogged);
    await dispatch(getUserInfo());
    setLoading(false);
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div style={loaderStyle}>
        <h1>Loading....</h1>
      </div>
    );
  } else if (isLogged == true && loading == false) {
    return <div>{children}</div>;
  } else if (isLogged == false && loading == false) {
    return <Navigate to="/login" />;
  }
};
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default PrivateRoute;
