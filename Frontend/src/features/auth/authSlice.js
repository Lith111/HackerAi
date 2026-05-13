import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register/', userData);
      return response.data;  // {user}
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'فشل التسجيل' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login/', credentials);
      return response.data; // { tokens, user }
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'فشل تسجيل الدخول' });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me/');
      return response.data; // user object
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'فشل تحميل المستخدم' });
    }
  }
);

// ---------- Slice ----------
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.detail || 'حدث خطأ';
      });

    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.tokens.access;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.tokens.access);
        localStorage.setItem('refrech', action.payload.tokens.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.detail || 'حدث خطأ';
      });

    // fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.detail || 'فشل تحميل المستخدم';
        // إذا فشل جلب المستخدم ربما يكون التوكن منتهي الصلاحية، نسجل الخروج
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;