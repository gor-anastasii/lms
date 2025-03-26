import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchUser, deleteUser, updateUsername } from '../../api/authApi';

export const register = createAsyncThunk('auth/register', async (userData) => {
  const data = await registerUser(userData);
  return data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const data = await loginUser(userData);
  return data;
});

export const fetchUserData = createAsyncThunk('auth/me', async (tokenUser) => {
  const data = await fetchUser(tokenUser);
  return data;
});

export const deleteUserAccount = createAsyncThunk('auth/deleteUser', async (tokenUser) => {
  const data = await deleteUser(tokenUser);
  return data;
});

export const updateUsernameFunc = createAsyncThunk(
  'auth/updateUsername',
  async ({ token, username }) => {
    const data = await updateUsername(token, username);
    return data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.role = action.payload.userData.role;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.role = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUsernameFunc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUsernameFunc.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user.username = action.payload.username;
      })
      .addCase(updateUsernameFunc.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
