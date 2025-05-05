import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses, fetchCoursesWithSearchFilter } from '../../api/courseApi.js';

export const loadCourses = createAsyncThunk('courses/load', async ({ userData, page = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = await fetchCourses(userData, page);
  return data;
});

export const fetchCoursesSearchFilter = createAsyncThunk(
  'course/search-filter',
  async ({ userData, query, topic, page = 1 }) => {
    const data = await fetchCoursesWithSearchFilter(userData, query, topic, page);
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
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilterTopic(state, action) {
      state.filterTopic = action.payload;
    },
    setCurrentPageStore(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload.courses;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCoursesSearchFilter.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.status = 'succeeded';
      })
      .addCase(fetchCoursesSearchFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoursesSearchFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setFilterTopic, setCurrentPageStore } = courseSlice.actions;
export default courseSlice.reducer;
