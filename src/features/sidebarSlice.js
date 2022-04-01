import { createSlice } from '@reduxjs/toolkit'
import { car_list } from '../utils/table';

const initialState = {
  toggle: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.toggle = !state.toggle;
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = sidebarSlice.actions

export default sidebarSlice.reducer