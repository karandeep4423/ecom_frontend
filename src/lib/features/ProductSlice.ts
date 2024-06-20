
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {  API_ENDPOINTS} from "@/utils/axios";
import { postRequest,getRequest } from "@/utils/Request";


// CREATE ASYNC THUNK
export const createProductAsync = createAsyncThunk<any, FormData>(
  "Product/create",
  async (formData) => {
    try {
        const response = await postRequest({
            endpoint: `${API_ENDPOINTS.Product.AddBookingService}`,
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

export const updateProductAsync = createAsyncThunk<any, FormData>(
  "Product/update",
  async (formData) => {
    try {

      const response = await postRequest({
        endpoint: `${API_ENDPOINTS.Product.AddBookingService}`,
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
export const deleteProductAsync = createAsyncThunk<any, FormData>(
  "Product/delete",
  async (formData) => {
    try {
      const response = await postRequest({
        endpoint: `${API_ENDPOINTS.Product.AddBookingService}`,
        payload:formData
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
export const getAllProductAsync = createAsyncThunk<any>(
  "Product/getAll",
  async () => {
    try {

        const response = await getRequest({
            endpoint: `${API_ENDPOINTS.Product.GetAll}`,
          });
      // toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      // toast.error(error.response.data.error);
      throw error;
    }
  }
);

interface Product {
    Products: any;
    loading: boolean;
  }
  
  const initialState: Product = {
    Products: [],
    loading: false,
  };
  

const Product = createSlice({
    name: "Product",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        // CREATE SHOP ADD CASE
        .addCase(createProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(createProductAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
        })
        // GET ALL SHOPS ADD CASE
        .addCase(getAllProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllProductAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.Products = action.payload.data;
        })
        .addCase(updateProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateProductAsync.fulfilled, (state) => {
          state.loading = false;
        })
        // DELETE SHOP ADD CASE
        .addCase(deleteProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteProductAsync.fulfilled, (state) => {
          state.loading = false;
        });
    },
  });
  
  export const { reset } = Product.actions;
  
  export default Product.reducer;
  



  