import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for adding a product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/products', productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for deleting a product
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch Products
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

    // Create Product
    .addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.status = 'succeeded';
    })

    // Remove Product
    .addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.status = 'succeeded';
    });
  }
});

export default productsSlice.reducer;