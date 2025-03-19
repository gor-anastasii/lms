import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoursePartsInfo } from '../../api/coursePartsApi';

export const fetchCourseParts = createAsyncThunk(
  'courseParts/fetchCourseParts',
  async ({ userData, courseId }) => {
    const response = await fetchCoursePartsInfo(userData, courseId);
    return response.data;
  },
);

const coursePartsSlice = createSlice({
  name: 'courseParts',
  initialState: {
    parts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseParts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseParts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parts = action.payload;
      })
      .addCase(fetchCourseParts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default coursePartsSlice.reducer;
