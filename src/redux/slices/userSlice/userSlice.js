import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserService, registerUserService } from "./userService";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUserService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// login yaz
export const loginUser = createAsyncThunk("user/login",async (userData,thunkAPI)=>{
  try {
    return await loginUserService(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})


const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }).addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }).addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });

     
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
