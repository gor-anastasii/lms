import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses, fetchCoursesWithSearchFilter } from '../../api/courseApi.js';

export const loadCourses = createAsyncThunk('courses/load', async (userData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = await fetchCourses(userData);
  return data;
});

export const fetchCoursesSearchFilter = createAsyncThunk(
  'course/search-filter',
  async ({ userData, query, topic }) => {
    const data = await fetchCoursesWithSearchFilter(userData, query, topic);
    return data;
  },
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
    searchQuery: '',
    filterTopic: '',
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilterTopic(state, action) {
      state.filterTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCoursesSearchFilter.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

export const { setSearchQuery, setFilterTopic } = courseSlice.actions;
export default courseSlice.reducer;
