import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchForums = createAsyncThunk(
  'forums/fetchForums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/forums');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createForums = createAsyncThunk(
  'forums/createForums',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/forums', commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeForums = createAsyncThunk(
  'forums/removeForums',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/forums/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const forumsSlice = createSlice({
  name: 'forums',
  initialState: {
    forums: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchForums.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchForums.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.forums = action.payload;
    })
    .addCase(fetchForums.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

    .addCase(createForums.pending, (state) => {

    })
    .addCase(createForums.fulfilled, (state, action) => {
      state.forums.push(action.payload);
    })
    .addCase(createForums.rejected, (state, action) => {
      state.error = action.payload;
    })

    // Remove comment
    .addCase(removeForums.pending, (state) => {
    })
    .addCase(removeForums.fulfilled, (state, action) => {
      state.forums = state.forums.filter(comment => comment.id !== action.payload);
    })
    .addCase(removeForums.rejected, (state, action) => {
      state.error = action.payload;
    });
  }
});

export default forumsSlice.reducer;