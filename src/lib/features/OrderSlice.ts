
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {  API_ENDPOINTS} from "@/utils/axios";
import { postRequest,getRequest, deleteRequest, putRequest, postFormRequest, putFormRequest } from "@/utils/Request";


// CREATE ASYNC THUNK
export const createOrderAsync = createAsyncThunk<any, FormData>(
  "Order/create",
  async (formData) => {
    try {
        const response = await postRequest({
            endpoint: `${API_ENDPOINTS.order.addOrder}`,
            payload:formData
          });
      toast.success(response.data.message);
      console.log(response.data);
      return response.data.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      throw error;
    }
  }
);

export const updateOrderAsync = createAsyncThunk<any, FormData>(
  "Order/update",
  async (formData) => {
    try {

      const response = await putRequest({
        endpoint: `${API_ENDPOINTS.order.updateOrder}/${formData?.id}`,
        payload:formData
      });
      toast.success(response.data.message);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      throw error;
    }
  }
);

// DELETE ASYNC THUNK
export const deleteOrderAsync = createAsyncThunk<any, FormData>(
  "Order/delete",
  async (id:any) => {
    try {
      const response = await deleteRequest({
        endpoint: `${API_ENDPOINTS.order.deleteOrder}/${id}`,
     
      });
      toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      throw error;
    }
  }
);

// GET ALL SHOPS ASYNC THUNK
export const getAllOrderAsync = createAsyncThunk<any>(
  "Order/getAll",
  async () => {
    try {

        const response = await getRequest({
            endpoint: `${API_ENDPOINTS.order.getAll}`,
          });
      toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      // toast.error(error.response.data.error);
      throw error;
    }
  }
);

interface Order {
    Orders: any;
    loading: boolean;
  }
  
  const initialState: Order = {
    Orders: [],
    loading: false,
  };
  

const Order = createSlice({
    name: "Order",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        // CREATE SHOP ADD CASE
        .addCase(createOrderAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(createOrderAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
        })
        // GET ALL SHOPS ADD CASE
        .addCase(getAllOrderAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllOrderAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.Orders = action.payload.data;
        })
        .addCase(updateOrderAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateOrderAsync.fulfilled, (state) => {
          state.loading = false;
        })
        // DELETE SHOP ADD CASE
        .addCase(deleteOrderAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteOrderAsync.fulfilled, (state) => {
          state.loading = false;
        });
    },
  });
  
  export const { reset } = Order.actions;
  
  export default Order.reducer;
  



  