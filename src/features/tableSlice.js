import { createSlice } from '@reduxjs/toolkit'
import {CarService} from '../services/car.service'
const initialState = {
  cars:[],
  car_list: '',
  gender_list:'',
  year_list:''
}

export const tableSlice = createSlice({
  name: 'carTable',
  initialState,
  reducers: {
    fetchCars: (state,action) => {
      state.cars = [...action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchCars } = tableSlice.actions

export default tableSlice.reducer 