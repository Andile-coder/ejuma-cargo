import ReactDOM from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import PrivateRoute from "./components/privateRoute/PrivateRouter.jsx";
import Warehouse from "./pages/warehouse/Warehouse.jsx";
import Products from "./pages/products/Products.jsx";
import Members from "./pages/members/Members.jsx";
import Drivers from "./pages/drivers/drivers.jsx";
import Shipments from "./pages/shipments/Shipments.jsx";
import Jobs from "./pages/jobs/Jobs.jsx";
import Map from "./pages/map/Map.jsx";
import WarehouseDetailPage from "./pages/warehouse/WarehouseDetailPage.jsx";
import ShipmentDetailPage from "./pages/shipments/ShipmentDetailPage.jsx";
import Orders from "./pages/orders/Orders.jsx";
import OrderDetailPage from "./pages/orders/OrderDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <App state="public">
        <Login />
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/dashboard",
    element: (
      <App state="private">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/warehouses",
    element: (
      <App state="private">
        <PrivateRoute>
          <Warehouse />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/warehouses/:id",
    element: (
      <App state="private">
        <PrivateRoute>
          <WarehouseDetailPage />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/shipments",
    element: (
      <App state="private">
        <PrivateRoute>
          <Shipments />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/shipments/:id",
    element: (
      <App state="private">
        <PrivateRoute>
          <ShipmentDetailPage />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/products",
    element: (
      <App state="private">
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/orders",
    element: (
      <App state="private">
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/orders/:id",
    element: (
      <App state="private">
        <PrivateRoute>
          <OrderDetailPage />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/members",
    element: (
      <App state="private">
        <PrivateRoute>
          <Members />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/drivers",
    element: (
      <App state="private">
        <PrivateRoute>
          <Drivers />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/jobs",
    element: (
      <App state="private">
        <PrivateRoute>
          <Jobs />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/map",
    element: (
      <App state="private">
        <PrivateRoute>
          <Map />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
