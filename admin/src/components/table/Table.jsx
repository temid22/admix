import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { userRequest } from "../../httpService";

const List = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      const res = await userRequest.delete(`/order/${id}/cancel`);
      if (res.data) {
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch {}
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Destination</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    alt=""
                    className="image"
                  />
                  {order.parcelId}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {format(order.createdAt)}
              </TableCell>
              <TableCell className="tableCell">${order.amount}</TableCell>
              <TableCell className="tableCell">{order.address}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${order.status}`}>{order.status}</span>
              </TableCell>
              <TableCell>
                <button
                  className="delete"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
