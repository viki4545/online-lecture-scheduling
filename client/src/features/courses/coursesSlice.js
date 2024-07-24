import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL } from "../../constants/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/courses/all-courses`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch courses.");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchLecturesByInstructorId = createAsyncThunk(
  "lectures/fetchLecturesByInstructorId",
  async (instructorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/courses/lectures/${instructorId}`
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch lectures.");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/courses/add-course`,
        course
      );
      toast.success("Course added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add course.");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const assignLecture = createAsyncThunk(
  "courses/assignLecture",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/courses/assign-lecture`,
        data
      );
      toast.success("Lecture assign successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to assign lecture.");
      return rejectWithValue(error.response.data.message);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCourse.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        if (Array.isArray(state.items)) {
          state.items.push(action.payload);
        }
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      })
      .addCase(assignLecture.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(assignLecture.fulfilled, (state, action) => {
        const updatedCourse = action.payload;
        if (Array.isArray(state.items)) {
          state.items = state.items.map((course) =>
            course._id === updatedCourse._id ? updatedCourse : course
          );
        }
      })
      .addCase(assignLecture.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      })
      .addCase(fetchLecturesByInstructorId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLecturesByInstructorId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLecturesByInstructorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default coursesSlice.reducer;
