

import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/userSlice';

import ProductSlice from './features/ProductSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:AuthReducer,
      Product:ProductSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']




