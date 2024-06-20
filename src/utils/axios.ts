// import axios from "axios";
// import { userConstants } from "../constants/user";

// // Add a request interceptor
// axios.interceptors.request.use(
//   async function (config) {
//     const token = await AsyncStorage.getItem(userConstants.tokenVariable);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   async function (response) {
//     const token = response?.data?.body?.accesstoken;
//     if (token) {
//       await AsyncStorage.setItem(userConstants.tokenVariable, token);
//     }
//     return response;
//   },
//   async function (error) {
//     if (error?.response?.data?.status === 401) {
//       await AsyncStorage.removeItem(userConstants.tokenVariable);
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "/auth/signup",
    Forgot: "/auth/forgotpassword",
   
  },


  Product: {
    GetAll: "/products",
    GetSingle: "/booking",
    AddBookingService: "/booking",
    changestatus: "/booking/status",
    GetBookingService: "/booking/service",
    FilterData: "/booking/filter",
    AssignBooking: "/booking/assignagent",
    bookingComplete: "/booking/complete",
    bookingcompleteCustomer: "/booking/customercomplete",
    Earning:"/booking/earning"
  },
 
};

