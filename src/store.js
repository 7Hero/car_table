import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './features/sidebarSlice'
import sortReducer from './features/sortSlice'
import tableReducer from './features/tableSlice'
import filterReducer from './features/filterSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sidebar: sidebarReducer,
    sort: sortReducer,
    table: tableReducer,
  },
});
