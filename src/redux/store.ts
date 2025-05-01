import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../redux/auth";
import accessTokenSlice from "./auth";
import toastSlice from "./toastSlice";
import scrollSlice from "./scrollSlice";
import sidebarSlice from "./sidebarSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: authSlice,
  toast: toastSlice,
  accessToken: accessTokenSlice,
  scroll: scrollSlice,
  sidebar: sidebarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    centeralizedStateData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const getReduxState = () => {
  return store.getState();
};
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
