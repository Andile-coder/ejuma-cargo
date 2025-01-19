import { Card, Col, Row } from "antd";
import { useEffect } from "react";
import { getOrders } from "../../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../../../redux/actions/shipmentActions";
import { getInvoices } from "../../../redux/actions/invoiceAction";
import { getWarehouses } from "../../../redux/actions/warehouseActions";
import MapContainerCont from "../../components/mapContainer/MapContainerCont";
const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const shipments = useSelector((state) => state.shipment.shipments);
  const invoices = useSelector((state) => state.invoice.invoices);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const tickets = useSelector((state) => state.ticket.tickets);
  const top_row_cards = [
    {
      title: "Invoices",
      icon: "",
      menu: true,
      actions: [{ icon: "", text: "", link: "" }],
      value: invoices?.length,
    },
    {
      title: "Shipments",
      icon: "",
      menu: true,
      actions: [{ icon: "", text: "", link: "" }],
      value: shipments?.length,
    },

    {
      title: "Orders",
      icon: "",
      menu: true,
      actions: [{ icon: "", text: "", link: "" }],
      value: orders?.length,
    },
    {
      title: "Warehouses",
      icon: "",
      menu: true,
      actions: [{ icon: "", text: "", link: "" }],
      value: warehouses?.length,
    },
    {
      title: "Tickets",
      icon: "",
      menu: true,
      actions: [{ icon: "", text: "", link: "" }],
      value: tickets?.length,
    },
  ];

  const getCommonHandler = async () => {
    await dispatch(getOrders());
    await dispatch(getShipments());
    await dispatch(getInvoices());
    await dispatch(getWarehouses());
  };

  useEffect(() => {
    getCommonHandler();
  }, []);
  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        justify="space-between"
      >
        {top_row_cards.map((elem, i) => (
          <Col key={i} className="gutter-row" span={4}>
            <Card
              // title={elem.title}
              bordered={false}
              style={{
                minWidth: 200,
              }}
            >
              <p>{elem.title}</p>
              <div>
                <span>{elem.value}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
