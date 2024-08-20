import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewMovieService,
  deleteMovieService,
  getAllMoviesService,
  updateMovieService,
} from "./movieService";



export const getAllMovies = createAsyncThunk("movie/getAllMovies", async () => {
  try {
    return await getAllMoviesService();
  } catch (error) {
    return throwError(error.response.data);
  }
});

export const addNewMovie = createAsyncThunk(
  "movie/addNewMovie",
  async (newMovie) => {
    try {
      return await addNewMovieService(newMovie);
    } catch (error) {
      return throwError(error.response.data);
    }
  }
);

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  try {
    return await deleteMovieService(id);
  } catch (error) {
    return throwError(error.response.data);
  }
});

export const updateMovie = createAsyncThunk("movie/updateMovie", async (updatedMovie) => {
  try {
    return await updateMovieService(updatedMovie.id, updatedMovie);
  } catch (error) {
    return throwError(error.response.data);
  }
});

const initialState = {
  movies: [],
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
      })
      .addCase(addNewMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies.push(action.payload);
      })
      .addCase(addNewMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      }).addCase(updateMovie.pending, (state) => {
        state.isLoading = true;
      }).addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = state.movies.map((movie) => {
          if (movie.id === action.payload.id) {
            return action.payload;
          }
          return movie;
        })
      }).addCase(updateMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;
