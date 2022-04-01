import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cars:'',
  car_list: '',
  gender_list:'',
  year_list:''
}

export const filterSlice = createSlice({
  name: 'carTable',
  initialState,
  reducers: {
    fetch: (state) => {
      state.cars = 
    }
  },
})

// Action creators are generated for each case reducer function
export const { filter } = filterSlice.actions

export default sortSlice.reducer 