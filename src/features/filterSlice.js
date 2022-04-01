import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter: (state, action) => {
      Object.assign(state, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { filter } = filterSlice.actions

export default sortSlice.reducer 