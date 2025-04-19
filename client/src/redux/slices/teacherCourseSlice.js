import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTeacherCourses,
  createTeacherCourse,
  updateTextFields,
  linkTagsToCourse,
  uploadCourseImage,
  updateCourseImageByUrl,
  deleteCourseImage,
  deleteCourse,
  updateCoursePublishedStatus,
  updateCourseStatus,
} from '../../api/courseApi.js';
import {
  createTeacherCoursePart,
  deleteCoursePart,
  deleteCoursePartImage,
  updateCoursePartImageByUrl,
  updateCoursePartsOrder,
  updateCoursePartStatus,
  updateTextFieldsCoursePart,
  uploadCoursePartImage,
} from '../../api/coursePartsApi.js';

export const loadTeacherCourses = createAsyncThunk('courses/load', async (userData) => {
  const data = await fetchTeacherCourses(userData);
  return data;
});

export const addTeacherCourse = createAsyncThunk(
  'courses/add',
  async ({ courseData, tokenUser }) => {
    const data = await createTeacherCourse(courseData, tokenUser);
    return data;
  },
);

export const addTeacherCoursePart = createAsyncThunk(
  'coursesPart/add',
  async ({ title, tokenUser, courseId }) => {
    const data = await createTeacherCoursePart(tokenUser, courseId, { title });
    return data;
  },
);

export const updateTextCourseFields = createAsyncThunk(
  'courses/update',
  async ({ id, courseData, tokenUser }) => {
    const data = await updateTextFields(id, courseData, tokenUser);
    return data;
  },
);

export const updateCoursePublished = createAsyncThunk(
  'courses/updatePublished',
  async ({ id, value, tokenUser }) => {
    const data = await updateCoursePublishedStatus(id, value, tokenUser);
    return data;
  },
);

export const updateCourseStatusFunc = createAsyncThunk(
  'courses/updateStatus',
  async ({ id, value, tokenUser }) => {
    const data = await updateCourseStatus(id, value, tokenUser);
    return data;
  },
);

export const updateTextCoursePartFields = createAsyncThunk(
  'coursePart/update',
  async ({ courseId, id, courseData, tokenUser }) => {
    const data = await updateTextFieldsCoursePart(courseId, id, courseData, tokenUser);
    return data;
  },
);

export const bindTagsToCourse = createAsyncThunk(
  'courses/bindTags',
  async ({ tokenUser, courseId, tagIds }) => {
    const data = await linkTagsToCourse(tokenUser, courseId, tagIds);
    return data;
  },
);

export const uploadCourseImageThunk = createAsyncThunk(
  'courses/uploadImage',
  async ({ courseId, file, tokenUser }) => {
    const imageUrl = await uploadCourseImage(courseId, file, tokenUser);
    return { courseId, imageUrl };
  },
);

export const updateCourseImageByUrlThunk = createAsyncThunk(
  'courses/updateImageByUrl',
  async ({ courseId, imageUrl, tokenUser }) => {
    const updatedImageUrl = await updateCourseImageByUrl(courseId, imageUrl, tokenUser);
    return { courseId, imageUrl: updatedImageUrl };
  },
);

export const uploadCoursePartImageThunk = createAsyncThunk(
  'coursePart/uploadImage',
  async ({ partId, file, tokenUser }) => {
    const imageUrl = await uploadCoursePartImage(partId, file, tokenUser);
    return { partId, mediaUrl: imageUrl };
  },
);

export const updateCoursePartImageByUrlThunk = createAsyncThunk(
  'coursePart/updateImageByUrl',
  async ({ partId, imageUrl, type, tokenUser }) => {
    const updatedImageUrl = await updateCoursePartImageByUrl(partId, imageUrl, type, tokenUser);
    return { partId, mediaUrl: updatedImageUrl };
  },
);

export const deleteCourseImageThunk = createAsyncThunk(
  'courses/deleteImage',
  async ({ courseId, tokenUser }) => {
    await deleteCourseImage(courseId, tokenUser);
    return courseId;
  },
);

export const deleteCoursePartImageThunk = createAsyncThunk(
  'coursePart/deleteImage',
  async ({ partId, tokenUser }) => {
    await deleteCoursePartImage(partId, tokenUser);
    return partId;
  },
);

export const deleteCourseThunk = createAsyncThunk(
  'courses/delete',
  async ({ courseId, tokenUser }) => {
    await deleteCourse(courseId, tokenUser);
    return courseId;
  },
);

export const deleteCoursePartThunk = createAsyncThunk(
  'courseParts/delete',
  async ({ coursePartId, tokenUser }) => {
    await deleteCoursePart(coursePartId, tokenUser);
    return coursePartId;
  },
);

export const updateCoursePartsOrderThunk = createAsyncThunk(
  'courseParts/updateOrder',
  async ({ tokenUser, courseId, updatedParts }) => {
    await updateCoursePartsOrder(tokenUser, courseId, updatedParts);
    return updatedParts;
  },
);

export const updateCoursePartStatusThunk = createAsyncThunk(
  'coursePart/updateStatus',
  async ({ partId, status, tokenUser }) => {
    const data = await updateCoursePartStatus(partId, status, tokenUser);
    return { partId, status: data.status };
  },
);

const teacherCourseSlice = createSlice({
  name: 'teacherCourses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTeacherCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTeacherCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(loadTeacherCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTeacherCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTeacherCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(addTeacherCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTextCourseFields.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTextCourseFields.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateTextCourseFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCoursePublished.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCoursePublished.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCoursePublished.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCourseStatusFunc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCourseStatusFunc.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourseStatusFunc.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(bindTagsToCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bindTagsToCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedCourse = action.payload;
        const index = state.courses.findIndex((course) => course.id === updatedCourse.id);
        if (index !== -1) {
          state.courses[index] = { ...state.courses[index], ...updatedCourse };
        }
      })
      .addCase(bindTagsToCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTeacherCoursePart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTeacherCoursePart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(addTeacherCoursePart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadCourseImageThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadCourseImageThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { courseId, imageUrl } = action.payload;
        const course = state.courses.find((course) => course.id === courseId);
        if (course) {
          course.imageUrl = imageUrl;
        }
      })
      .addCase(uploadCourseImageThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateCourseImageByUrlThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCourseImageByUrlThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { courseId, imageUrl } = action.payload;
        const course = state.courses.find((course) => course.id === courseId);
        if (course) {
          course.imageUrl = imageUrl;
        }
      })
      .addCase(updateCourseImageByUrlThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCourseImageThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourseImageThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const courseId = action.payload;
        const course = state.courses.find((course) => course.id === courseId);
        if (course) {
          course.imageUrl = null;
        }
      })
      .addCase(deleteCourseImageThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCourseThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const courseId = action.payload;
        state.courses = state.courses.filter((course) => course.id !== courseId);
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCoursePartThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCoursePartThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const coursePartId = action.payload;
        state.courses.forEach((course) => {
          if (course.CourseParts) {
            course.CourseParts = course.CourseParts.filter((part) => part.id !== coursePartId);
          }
        });
      })
      .addCase(deleteCoursePartThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCoursePartsOrderThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateCoursePartsOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTextCoursePartFields.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTextCoursePartFields.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateTextCoursePartFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadCoursePartImageThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadCoursePartImageThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { partId, mediaUrl } = action.payload;

        state.courses.forEach((course) => {
          if (course.CourseParts) {
            const partIndex = course.CourseParts.findIndex((part) => part.id === partId);
            if (partIndex !== -1) {
              course.CourseParts[partIndex].mediaUrl = mediaUrl;
            }
          }
        });
      })
      .addCase(uploadCoursePartImageThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCoursePartImageByUrlThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCoursePartImageByUrlThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { partId, mediaUrl } = action.payload;

        state.courses.forEach((course) => {
          if (course.CourseParts) {
            const partIndex = course.CourseParts.findIndex((part) => part.id === partId);
            if (partIndex !== -1) {
              course.CourseParts[partIndex].mediaUrl = mediaUrl;
            }
          }
        });
      })
      .addCase(updateCoursePartImageByUrlThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCoursePartImageThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCoursePartImageThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const partId = action.payload;
        state.courses.forEach((course) => {
          if (course.CourseParts) {
            const partIndex = course.CourseParts.findIndex((part) => part.id === partId);
            if (partIndex !== -1) {
              course.CourseParts[partIndex].mediaUrl = null;
            }
          }
        });
      })
      .addCase(deleteCoursePartImageThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCoursePartStatusThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCoursePartStatusThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { partId, status } = action.payload;

        state.courses.forEach((course) => {
          if (course.CourseParts) {
            const part = course.CourseParts.find((p) => p.id === partId);
            if (part) {
              part.status = status;
            }
          }
        });
      })
      .addCase(updateCoursePartStatusThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default teacherCourseSlice.reducer;
