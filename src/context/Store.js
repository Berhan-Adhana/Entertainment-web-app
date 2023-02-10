import { configureStore } from "@reduxjs/toolkit";
import searchMovieReducer from "./searchSlice";
import loggedUserReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Storage configuration object
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, loggedUserReducer);

const store = configureStore({
  reducer: {
    searchMovie: searchMovieReducer,

    loggedUser: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export let persistor = persistStore(store);
export default store;
