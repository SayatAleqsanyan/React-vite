import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/comments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComments = createAsyncThunk(
  'comments/createComments',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/comments', commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeComments = createAsyncThunk(
  'comments/removeComments',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/comments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchComments.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.comments = action.payload;
    })
    .addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

    .addCase(createComments.pending, (state) => {

    })
    .addCase(createComments.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(createComments.rejected, (state, action) => {
      state.error = action.payload;
    })

    // Remove comment
    .addCase(removeComments.pending, (state) => {
    })
    .addCase(removeComments.fulfilled, (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    })
    .addCase(removeComments.rejected, (state, action) => {
      state.error = action.payload;
    });
  }
});

export default commentsSlice.reducer;