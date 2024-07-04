import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './features/userSlice';
import ProductSlice from './features/ProductSlice';
import OrderSlice from './features/OrderSlice';
import CartSlice from './features/CartSlice';

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // reducers to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: AuthReducer,
    product: ProductSlice,
    order: OrderSlice,
    cart: CartSlice,
  })
);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable state for Redux Persist
    }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['store']['getState']>;
export type AppDispatch = AppStore['store']['dispatch'];
