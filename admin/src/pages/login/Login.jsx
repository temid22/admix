import "./login.css";
import {
  AccountCircle,
  Facebook,
  Google,
  Instagram,
  Lock,
  Twitter,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
      if (!admin) {
        setErrorMessage(
          "not allowed!, admin only, enter valid username/password"
        );
      }
    } catch {}
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="signinSignup">
          <form className="signinForm">
            <h1 className="signIntitle">Sign In</h1>
            {!admin && <p className="errorMessage">{errorMessage}</p>}
            <div className="inputField">
              <AccountCircle className="icon" />
              <label>Username</label>
              <input
                type="text"
                placeholder="username"
                className="inputItself"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputField">
              <Lock className="icon" />
              <label>Password</label>
              <input
                type="password"
                className="inputItself"
                placeholder="password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="submitBtn" onClick={handleLogin}>
              Login
            </button>
            <p className="socialText">Sign in with Socials</p>
            <div className="socialMedia">
              <div className="socialIcon">
                <Facebook style={{ color: "blue" }} />
                <Instagram style={{ color: "maroon" }} />
                <Twitter style={{ color: "skyblue" }} />
                <Google style={{ color: "red" }} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
