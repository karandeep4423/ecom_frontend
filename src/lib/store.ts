

import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/userSlice';

import ProductSlice from './features/ProductSlice';
import OrderSlice from './features/OrderSlice';
import CartSlice from './features/CartSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:AuthReducer,
      Product:ProductSlice,
      Order:OrderSlice,
      Cart:CartSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']




