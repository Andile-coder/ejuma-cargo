import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import PrivateRoute from "./components/privateRoute/PrivateRouter.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
  {
    path: "/dashboard",
    element: (
      <App>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </App>
    ),
    loader: () => Promise.resolve({}),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
