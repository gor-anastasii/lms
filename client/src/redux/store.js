import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import courseReducer from './slices/courseSlice.js';
import progressReducer from './slices/progressSlice.js';
import coursePartReducer from './slices/coursePartSlice.js';
import currentCourseReducer from './slices/currentCourseSlice.js';
import reviewReducer from './slices/reviewSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    progress: progressReducer,
    coursePart: coursePartReducer,
    currentCourse: currentCourseReducer,
    review: reviewReducer,
  },
});
