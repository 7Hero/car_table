import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  label:'last_name',
  type:0,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sort: (state, action) => {
      Object.assign(state, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { sort } = sortSlice.actions

export default sortSlice.reducer 