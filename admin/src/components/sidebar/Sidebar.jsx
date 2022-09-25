import "./sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  LocalShipping,
  Store,
  InsertChart,
  SettingsApplications,
  ExitToApp,
  NotificationsNone,
  SettingsSystemDaydreamOutlined,
  PsychologyOutlined,
  AccountCircleOutlined,
  LogoDev,
  Cancel,
} from "@mui/icons-material";
import ScrollToOrders from "../scroll/ScrollToOrders";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { useSidebarContext } from "../../SideBarContextProvider";
import { IconButton, Tooltip } from "@mui/material";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { activeMenu, setActiveMenu, screenSize, menuDisplay, setMenuDisplay } =
    useSidebarContext();

  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };
  useEffect(() => {
    if (screenSize >= 900) {
      setMenuDisplay(false);
    } else {
      setMenuDisplay(true);
    }
  }, [screenSize]);

  return (
    <div className="sidebar">
      {activeMenu && (
        <>
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <LogoDev
                style={{ color: "rgb(79, 195, 195)" }}
                onClick={handleCloseSideBar}
              />
              <span className="logo">T.D</span>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p
                className="title"
                style={{
                  color: "rgb(79, 195, 195)",
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                {" "}
                {username}
              </p>
              {menuDisplay && (
                <Tooltip title="hide">
                  <IconButton
                    style={{
                      marginLeft: 80,
                      top: -30,
                      color: "rgb(79, 195, 195)",
                    }}
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                  >
                    <Cancel />
                  </IconButton>
                </Tooltip>
              )}
              <li onClick={handleCloseSideBar}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Dashboard className="icon" />
                  <span>DASHBOARD</span>
                </Link>
              </li>
              <p className="title">GO TO</p>
              <Link
                to="/users"
                style={{ textDecoration: "none" }}
                onClick={handleCloseSideBar}
              >
                <li>
                  <PersonOutline className="icon" />
                  <span>Users</span>
                </li>
              </Link>
              <Link
                to="/products"
                style={{ textDecoration: "none" }}
                onClick={handleCloseSideBar}
              >
                <li>
                  <Store className="icon" />
                  <span>Products</span>
                </li>
              </Link>
              <ScrollToOrders onClick={handleCloseSideBar} />
              <li onClick={handleCloseSideBar}>
                <LocalShipping className="icon" />
                <span>Delivery</span>
              </li>
              <p className="title">ANALYTICS</p>
              <li onClick={handleCloseSideBar}>
                <InsertChart className="icon" />
                <span>Stats</span>
              </li>
              <li onClick={handleCloseSideBar}>
                <NotificationsNone className="icon" />
                <span>Notifications</span>
              </li>
              <p className="title">SERVICE</p>
              <li onClick={handleCloseSideBar}>
                <SettingsSystemDaydreamOutlined className="icon" />
                <span>System Health</span>
              </li>
              <li onClick={handleCloseSideBar}>
                <PsychologyOutlined className="icon" />
                <span>Logs</span>
              </li>
              <li onClick={handleCloseSideBar}>
                <SettingsApplications className="icon" />
                <span>Settings</span>
              </li>
              <p className="title">USER</p>
              <li onClick={handleCloseSideBar}>
                <AccountCircleOutlined className="icon" />
                <span>Profile</span>
              </li>
              {admin && (
                <li>
                  <ExitToApp className="icon1" />
                  <button className="iconbutton" onClick={handleLogout}>
                    LOG OUT
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className="bottom">
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "LIGHT" })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "DARK" })}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
