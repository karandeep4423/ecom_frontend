
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {  API_ENDPOINTS} from "@/utils/axios";
import { postRequest,getRequest, deleteRequest, putRequest, postFormRequest, putFormRequest } from "@/utils/Request";


// CREATE ASYNC THUNK
export const createProductAsync = createAsyncThunk<any, FormData>(
  "Product/create",
  async (formData) => {
    try {
        const response = await postFormRequest({
            endpoint: `${API_ENDPOINTS.product.addProduct}`,
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

      const response = await putFormRequest({
        endpoint: `${API_ENDPOINTS.product.updateProduct}/${formData?.id}`,
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
  async (id:any) => {
    try {
      const response = await deleteRequest({
        endpoint: `${API_ENDPOINTS.product.deleteProduct}/${id}`,
     
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
            endpoint: `${API_ENDPOINTS.product.getAll}`,
          });
     
     
      return response.data;
    } catch (error: any) {
     
      toast.error(error.response.data.error);
      throw error;
    }
  }
);



export const getSingleProductAsync = createAsyncThunk<any>(
  "Product/getSingle",
  async (id) => {
    try {

        const response = await getRequest({
            endpoint: `${API_ENDPOINTS.product.getAll}/${id}`,
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


interface Product {
    Products: [];
    SingleProduct:object
    loading: boolean;
  }
  
  const initialState: Product = {
    Products: [],
    SingleProduct:{},
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

        .addCase(getSingleProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(getSingleProductAsync.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.SingleProduct = action.payload.data;
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
  



  