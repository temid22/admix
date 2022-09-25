import "./scrollToOrders.css";
import { CreditCard } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ScrollToOrders = () => {
  const scrollOrders = () => {
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  };
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <li onClick={scrollOrders}>
        <CreditCard className="icon" />
        <span>Orders</span>
      </li>
    </Link>
  );
};
export default ScrollToOrders;
