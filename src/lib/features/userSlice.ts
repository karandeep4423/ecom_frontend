import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { getRequest, postRequest } from "@/utils/Request";
import { API_ENDPOINTS } from "@/utils/axios";

interface UserState {
  createUser: any;
  user: any;
  loading: boolean;

}

const initialState: UserState = {
  createUser: null,
  user: null,
  loading: false,
 
};

// CREATE ASYNC THUNKS
export const createUserAsync = createAsyncThunk(
  "user/create",
  async (payload: any) => {
    try {
      const response = await postRequest({
        endpoint: `${API_ENDPOINTS.auth.signup}`,
        payload:payload
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

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (formData: any) => {
    try {
      const response = await getRequest({
        endpoint: `${API_ENDPOINTS.auth.login}`,
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



export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.auth.logout}`,
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    toast.error(error.response.data.error);
    throw error;
  }
});

export const forgetUserAsync = createAsyncThunk(
  "user/forget",
  async (formData: any) => {
    try {
      const response = await getRequest({
        endpoint: `${API_ENDPOINTS.auth.Forgot}`,
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







const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUserData: (state) => {
      state.user = null;
    },
    addUserData: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.createUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
      })
   
   
 
    
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { removeUserData, addUserData } = authSlice.actions;
export default authSlice.reducer;
