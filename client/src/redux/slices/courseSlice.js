import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCourses,
  createCourse,
  deleteCourse,
  updateCourseStatus,
  updateCourse,
  fetchCoursesWithSearchFilter,
} from '../../api/courseApi.js';

export const loadCourses = createAsyncThunk('courses/load', async (userData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = await fetchCourses(userData);
  return data;
});

export const addCourse = createAsyncThunk('courses/add', async (courseData) => {
  const data = await createCourse(courseData);
  return data;
});

export const removeCourse = createAsyncThunk('courses/remove', async (id) => {
  await deleteCourse(id);
  return id;
});

export const changeCourseStatus = createAsyncThunk(
  'courses/changeStatus',
  async ({ id, status }) => {
    const data = await updateCourseStatus(id, status);
    return data;
  },
);

export const editCourse = createAsyncThunk('courses/edit', async ({ id, courseData }) => {
  const data = await updateCourse(id, courseData);
  return data;
});

export const fetchCoursesSearchFilter = createAsyncThunk(
  'course/search-filter',
  async ({ userData, query, topic }) => {
    const data = await fetchCoursesWithSearchFilter(userData, query, topic);
    console.log('u: ', userData, ' s: ', query, ' t: ', topic);
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
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(changeCourseStatus.fulfilled, (state, action) => {
        const course = state.courses.find((course) => course.id === action.meta.arg.id);
        if (course) {
          course.status = action.payload.status;
        }
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(fetchCoursesSearchFilter.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

export const { setSearchQuery, setFilterTopic } = courseSlice.actions;
export default courseSlice.reducer;
