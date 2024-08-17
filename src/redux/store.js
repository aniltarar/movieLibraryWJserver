import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import movieReducer from "./slices/movieSlice/movieSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});
