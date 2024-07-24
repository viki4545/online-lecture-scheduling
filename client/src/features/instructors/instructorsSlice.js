import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const fetchInstructor = createAsyncThunk(
  "instructors/fetchInstructor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/instructors/all-instructor"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const instructorsSlice = createSlice({
  name: "instructors",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchInstructor.fulfilled, (state, action) => {
        state.status = "Success";
        state.items = action.payload;
      })
      .addCase(fetchInstructor.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      });
  },
});

export default instructorsSlice.reducer;
