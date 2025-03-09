import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCourses,
  createCourse,
  deleteCourse,
  updateCourseStatus,
  updateCourse,
  filterCourses,
  searchCourses,
} from '../../api/courseApi.js';

export const loadCourses = createAsyncThunk('courses/load', async () => {
  const data = await fetchCourses();
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

export const filterCoursesByTopic = createAsyncThunk('courses/filter', async (topic) => {
  const data = await filterCourses(topic);
  return data;
});

export const searchCoursesByQuery = createAsyncThunk('courses/search', async (query) => {
  const data = await searchCourses(query);
  return data;
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
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
      .addCase(filterCoursesByTopic.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(searchCoursesByQuery.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

export default courseSlice.reducer;
