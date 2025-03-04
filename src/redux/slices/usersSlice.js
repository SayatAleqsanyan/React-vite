import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching users
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

// Async Thunk for blocking/unblocking a user
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

// Async Thunk for deleting a user
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
    // Fetch Users
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

    // Toggle User Block
    .addCase(toggleUserBlock.fulfilled, (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    })

    // Delete User
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    });
  }
});

export default usersSlice.reducer;