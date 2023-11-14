import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index";

const persistConfig = {
  key: "homeschool-root",
  storage,
  blacklist: [],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPTION_SECRET_KEY,
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
