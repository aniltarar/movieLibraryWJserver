import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMoviesService } from "./movieService";

export const getAllMovies = createAsyncThunk("movie/getAllMovies", async () => {
  try {
    return await getAllMoviesService();
  } catch (error) {
    return throwError(error.response.data);
  }
});

const initialState = {
  movies: [],
  movie: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.movie = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;