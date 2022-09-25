import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getorderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //DELETE
    deleteorderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteorderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteorderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //UPDATE
    updateorderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateorderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.order;
    },
    updateorderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addorderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addorderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.push(action.payload);
    },
    addorderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { deleteorderStart, deleteorderSuccess, deleteorderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
