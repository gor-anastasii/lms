import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProgressInfo, subscribeToCourse } from '../../api/progressApi';

export const fetchTotalProgress = createAsyncThunk(
  'progress/fetchTotalProgress',
  async (userData) => {
    const response = await fetchProgressInfo(userData);
    return response;
  },
);

export const subscribeCourse = createAsyncThunk(
  'progress/subscribeToCOurse',
  async (userData, courseId) => {
    const responce = await subscribeToCourse(userData, courseId);
    return responce;
  },
);

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    totalProgress: 0,
    averageProgress: 0,
    totalCourses: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalProgress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalProgress = action.payload.percentageProgress;
        state.averageProgress = action.payload.averageProgress;
        state.totalCourses = action.payload.totalCourses;
      })
      .addCase(fetchTotalProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default progressSlice.reducer;
