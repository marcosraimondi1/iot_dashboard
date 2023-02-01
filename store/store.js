import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Middlewares
import { middlewares } from "./middleware/middlewares.js";

// Reducers
import authReducer from "./slices/authSlice.js";
import devicesReducer from "./slices/devicesSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  devices: devicesReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // enhanced reducer to persist

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    // configuration needed to avoid warnings using configurestore + redux-persist
    // docs: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares); // adding custom middlewares
  },
});

let persistor = persistStore(store);

export { store, persistor };
