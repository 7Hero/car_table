import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './features/sidebarSlice'
import sortReducer from './features/sortSlice'
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    sort: sortReducer,
  },
});
