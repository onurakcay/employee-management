/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice.js';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: true, // Enable Redux DevTools
});

export default store;
