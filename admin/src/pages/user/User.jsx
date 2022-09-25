import "./user.css";
import Chart from "../../components/chart/Chart";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../httpService";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { updateUser } from "../../redux/apiCalls";

const User = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [uStats, setUserStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.userList.users.find((user) => user._id === id)
  );
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

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      _id: id,
      ...inputs,
    };
    updateUser(id, user, dispatch);
  };

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar />
        <div className="uUser">
          <div className="userTitleContainer">
            <h1 className="userTitle">USER</h1>
            <Link to="/users/newuser">
              <button className="userAddButton">create</button>
            </Link>
          </div>
          <div className="userTop">
            <div className="userTopLeft">
              <Chart
                aspect={2 / 1}
                data={uStats}
                grid
                dataKey="Users"
                title="Users"
              />
            </div>
            <div className="userTopRight">
              <div className="userInfoTop">
                <img
                  src={
                    user.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                  className="userInfoImg"
                />
                <span className="userName">{user.username}</span>
              </div>
              <div className="userInfoBottom">
                <div className="userInfoItem">
                  <span className="userInfoKey">id:</span>
                  <span className="userInfoValue">{user._id}</span>
                </div>
                <div className="userInfoItem">
                  <span className="userInfoKey">email:</span>
                  <span className="userInfoValue">{user.email}</span>
                </div>
                <div className="userInfoItem">
                  <span className="userInfoKey">Admin:</span>
                  <span className="userInfoValue">{user.isAdmin}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="userBottom">
            <form className="userForm">
              <div className="userFormLeft">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  onChange={handleChange}
                />
                <label htmlFor="">Admin?</label>
                <select name="isAdmin" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="userFormRight">
                <div className="userUpload">
                  <img
                    src={
                      user.img ||
                      "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="userUploadImg"
                  />
                </div>
                <button className="userButton" onClick={handleClick}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
