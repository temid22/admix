import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.payload.accessToken;

const TOKEN = JSON.parse(localStorage.getItem("user"))?.accessToken;

export const generalRequest = axios.create({
  baseURL: BASE_URL,
});

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.payload.accessToken;

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
