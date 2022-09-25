import { generalRequest, userRequest } from "../httpService";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
  signupFailure,
} from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./userListRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await generalRequest.post("auth/login", user);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    dispatch(loginSuccess(res.data));
    window.location.pathname = "/";
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await generalRequest.post("auth/register", user);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(signupSuccess(res.data));
      window.location.pathname = "/";
    }
  } catch (err) {
    dispatch(signupFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("user");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}`);
    if (res.data) {
      dispatch(deleteUserSuccess(res.data));
      window.location.pathname = "/users";
    }
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/user/${id}`, user);
    if (res.data) {
      dispatch(updateUserSuccess(res.data));
      window.location.pathname = "/users";
    }
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    if (res.data) {
      dispatch(addUserSuccess(res.data));
      window.location.pathname = "/users";
    }
  } catch (err) {
    dispatch(addUserFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await generalRequest.get("parcel");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/parcel/${id}`);
    if (res.data) {
      dispatch(deleteProductSuccess(res.data));
      window.location.pathname = "/products";
    }
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/parcel/${id}`, product);
    if (res.data) {
      dispatch(updateProductSuccess({ id, product }));
      window.location.pathname = "/products";
    }
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/parcel`, product);
    if (res.data) {
      dispatch(addProductSuccess(res.data));
      window.location.pathname = "/products";
    }
  } catch (err) {
    dispatch(addProductFailure());
  }
};
