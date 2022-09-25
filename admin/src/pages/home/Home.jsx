import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../httpService";
import ScrollToTop from "../../components/scroll/SrollToTop";

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/user/stats");
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Users: item.Count },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <ScrollToTop />
        <div className="widgets">
          <Widget />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="User Statistcs"
            aspect={2 / 1}
            data={userStats}
            dataKey="Users"
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Orders</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
