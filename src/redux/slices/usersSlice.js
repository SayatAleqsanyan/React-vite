import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, updatedUser }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/user/${id}`, updatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleUserBlock = createAsyncThunk(
  'users/toggleUserBlock',
  async ({ id, isBlocked }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/users/${id}`, { isBlocked: !isBlocked });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

    .addCase(toggleUserBlock.fulfilled, (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    })

    .addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    })

    .addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.status = 'succeeded';
    })
  }
});

export default usersSlice.reducer;
