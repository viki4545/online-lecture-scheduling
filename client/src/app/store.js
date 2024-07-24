import { configureStore } from "@reduxjs/toolkit";
import instructorsReducer from "../features/instructors/instructorsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructors: instructorsReducer,
    courses: coursesReducer,
  },
});
