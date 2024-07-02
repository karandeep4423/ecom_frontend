import axios from "axios";

const userConstants = {
  tokenVariable: 'x-auth-token',
  jwtSign: 'JWT_SECRET',
};


// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers[userConstants.tokenVariable] = localStorage.getItem(
      userConstants.tokenVariable
    );
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    const token = response?.headers[userConstants.tokenVariable];
    if (token) localStorage.setItem(userConstants.tokenVariable, token);
    return response;
  },
  function (error) {
    if (error?.response?.data?.statusCode === 403) {
      localStorage.removeItem(userConstants.tokenVariable);
      localStorage.removeItem("persist:root");
      localStorage.clear();
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);


export default axios;

export const API_ENDPOINTS = {
  auth: {
    login: "/users/login",
    logout: "/users/logout",
    signup: "/users",
    forgot: "/users/forgotpassword",
  },
  product: {
    getAll: "/products",
    addProduct: "/products",
    updateProduct:"/products",
    deleteProduct:"/products"
  },

  order: {
    getAll: "/orders",
    addOrder: "/orders",
    updateOrder:"/orders",
    deleteOrder:"/orders"
  },

  cart:{
    getAll: "/carts",
    addCart: "/carts",
    updateCart:"/carts",
    deleteCart:"/carts"
  }

  
};
