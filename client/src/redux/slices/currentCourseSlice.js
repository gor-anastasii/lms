import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourseDetails } from '../../api/courseApi';
import { updateCourseProgress } from '../../api/progressApi';

export const fetchCourseDetailsAsync = createAsyncThunk(
  'currentCourse/fetchCourseDetails',
  async ({ courseId, token }) => {
    const response = await fetchCourseDetails(courseId, token);
    return response;
  },
);

export const updateCourseProgressAsync = createAsyncThunk(
  'currentCourse/updateCourseProgress',
  async ({ courseId, currentPartOrder, token }) => {
    const response = await updateCourseProgress(courseId, currentPartOrder, token);
    return response;
  },
);

const currentCourseSlice = createSlice({
  name: 'currentCourse',
  initialState: {
    course: null,
    progress: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseDetailsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload.course;
        state.progress = action.payload.progress;
      })
      .addCase(fetchCourseDetailsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCourseProgressAsync.fulfilled, (state, action) => {
        state.progress = action.payload;
      });
  },
});

export default currentCourseSlice.reducer;
