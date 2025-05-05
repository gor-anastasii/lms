import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchReviewsByCourseId,
  fetchReviewsByUserIdAndCourseId,
  createReview,
  deleteReview,
  deleteReviewAdmin,
} from '../../api/reviewApi';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchByCourseId',
  async ({ courseId, userData }) => {
    const response = await fetchReviewsByCourseId(courseId, userData);
    return response.data;
  },
);

export const fetchUserReviews = createAsyncThunk(
  'reviews/fetchByUserAndCourseId',
  async ({ userData, courseId }) => {
    const response = await fetchReviewsByUserIdAndCourseId(userData, courseId);
    return response.data;
  },
);

export const addReview = createAsyncThunk('reviews/addReview', async ({ reviewData, userData }) => {
  const response = await createReview(reviewData, userData);
  return response.data;
});

export const removeReview = createAsyncThunk(
  'reviews/removeReview',
  async ({ reviewId, userData }) => {
    const response = await deleteReview(reviewId, userData);
    return response.data;
  },
);

export const removeReviewAdmin = createAsyncThunk(
  'reviewsAdmin/removeReviewAdmin',
  async ({ reviewId, userData }) => {
    const response = await deleteReviewAdmin(reviewId, userData);
    return response.data;
  },
);

const reviewSlice = createSlice({
  name: 'Review',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.concat(action.payload.review);
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload.reviewId);
      })
      .addCase(removeReviewAdmin.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload.reviewId);
      });
  },
});

export default reviewSlice.reducer;
