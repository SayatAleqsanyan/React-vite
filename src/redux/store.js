import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productsSlice from "./slices/productsSlice.js";
import usersReducer from "./slices/usersSlice.js";
import commentsSlice from "./slices/commentsSlice.js";
import forumsSlice from "./slices/forumsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
    users: usersReducer,
    comments: commentsSlice,
    forums: forumsSlice,
  },
});

export default store;
