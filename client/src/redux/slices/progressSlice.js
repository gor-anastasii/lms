import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProgressInfo,
  subscribeToCourse,
  fetchProgressForCourse,
} from '../../api/progressApi';

export const fetchTotalProgress = createAsyncThunk(
  'progress/fetchTotalProgress',
  async (userData) => {
    const response = await fetchProgressInfo(userData);
    return response;
  },
);

export const fetchAllProgress = createAsyncThunk('progress/fetchAllProgress', async (userData) => {
  const responce = await fetchProgressForCourse(userData);
  console.log(responce);
  return responce.data;
});

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
    allProgress: [],
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
      })
      .addCase(fetchAllProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProgress = action.payload.progress;
      });
  },
});

export default progressSlice.reducer;
