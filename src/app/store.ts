import { combineReducers, configureStore } from "@reduxjs/toolkit";
import queryApi from "./queryApi";
import authReducer from "../features/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import { featureFlagSlice } from "../features/featureFlags/featureFlagsSlice";
import { snackbarsSlice } from "../features/snackbar/snackbarsSlice";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage: storage,
      whitelist: ["user"],
    },
    authReducer
  ),
  snackbars: snackbarsSlice.reducer,
  featureFlags: featureFlagSlice.reducer,
  [queryApi.reducerPath]: queryApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(queryApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
