
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {  API_ENDPOINTS} from "@/utils/axios";
import { postRequest,getRequest, deleteRequest, putRequest, postFormRequest, putFormRequest } from "@/utils/Request";


// CREATE ASYNC THUNK
export const createCartAsync = createAsyncThunk<any, FormData>(
  "Cart/create",
  async (formData) => {
    try {
        const response = await postRequest({
            endpoint: `${API_ENDPOINTS.cart.addCart}`,
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

export const updateCartAsync = createAsyncThunk<any, FormData>(
  "Cart/update",
  async (formData) => {
    try {

      const response = await putFormRequest({
        endpoint: `${API_ENDPOINTS.Cart.updateCart}/${formData?.id}`,
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
export const deleteCartAsync = createAsyncThunk<any, FormData>(
  "Cart/delete",
  async (id:any) => {
    console.log('id',id)
    try {
      const response = await deleteRequest({
        endpoint: `${API_ENDPOINTS.cart.deleteCart}/${id}`,
     
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
export const getAllCartAsync = createAsyncThunk<any>(
  "Cart/getAll",
  async () => {
    try {

        const response = await getRequest({
            endpoint: `${API_ENDPOINTS.cart.getAll}`,
          });
     
      return response.data;
    } catch (error: any) {
      console.log("error",error.response.data);
      // toast.error(error.response.data.error);
      throw error;
    }
  }
);

interface Cart {
    Carts: any;
    loading: boolean;
  }
  
  const initialState: Cart = {
    Carts: [],
    loading: false,
  };
  

const Cart = createSlice({
    name: "Cart",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        // CREATE SHOP ADD CASE
        .addCase(createCartAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(createCartAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
        })
        // GET ALL SHOPS ADD CASE
        .addCase(getAllCartAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllCartAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.Carts = action.payload.data;
        })
        .addCase(updateCartAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateCartAsync.fulfilled, (state) => {
          state.loading = false;
        })
        // DELETE SHOP ADD CASE
        .addCase(deleteCartAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCartAsync.fulfilled, (state) => {
          state.loading = false;
        });
    },
  });
  
  export const { reset } = Cart.actions;
  
  export default Cart.reducer;
  



  