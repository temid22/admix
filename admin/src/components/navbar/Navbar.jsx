import "./navbar.scss";
import {
  SearchOutlined,
  LanguageOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
  Menu,
} from "@mui/icons-material";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { useSidebarContext } from "../../SideBarContextProvider";

const NavButton = ({ title, customFunc, icon }) => (
  <Tooltip title={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{
        color: "rgb(79, 195, 195)",
        position: "relative",
        backgroundColor: "none",
        fontSize: 2,
        cursor: "pointer",
        border: "none",
        borderRadius: 50,
        outline: "none",
      }}
      className="item"
    >
      <span
        style={{ position: "absolute", display: "inline-flex" }}
        className="dis"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  const {
    activeMenu,
    setActiveMenu,
    setScreenSize,
    screenSize,
    menuDisplay,
    setMenuDisplay,
  } = useSidebarContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    if (screenSize >= 900) {
      setMenuDisplay(false);
    } else {
      setMenuDisplay(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="navbar">
      <div className="wrapper">
        {menuDisplay && (
          <NavButton
            title="menu"
            customFunc={handleActiveMenu}
            icon={<Menu />}
          />
        )}
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
        <div className="items">
          <div className="item">
            <Tooltip title="English">
              <LanguageOutlined className="icon" />
            </Tooltip>
          </div>
          <div className="item">
            <Tooltip title="Dark Mode">
              <DarkModeOutlined
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            </Tooltip>
          </div>
          <div className="item">
            <FullscreenExitOutlined className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
