import "./widget.css";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../httpService";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("order/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)}%
            {perc < 0 ? (
              <ArrowDownwardOutlined className="featuredIcon negative" />
            ) : (
              <ArrowUpwardOutlined className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub"> Reviewed with previous month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$5,123</span>
          <span className="featuredMoneyRate">
            -121 <ArrowDownwardOutlined className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub"> Reviewed with previous month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$7,123</span>
          <span className="featuredMoneyRate">
            +432 <ArrowUpwardOutlined className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub"> Reviewed with previous month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
