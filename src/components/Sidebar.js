import { useMemo } from "react"
import { useSelector } from "react-redux"
import { listofUniqueValues } from "../utils/table"
import DropdownMenu from "./DropdownMenu"
import Select from "react-select";
import { useDispatch } from "react-redux";
import { filter } from "../features/filterSlice";
import DropdownRadioGroup from "./DropdownRadioGroup";
import PriceRange from "./PriceRange";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { toggle } = useSelector( state => state.sidebar)
  const row_data = useSelector( state => state.table.cars)
  const style = toggle ? '' : 'hide-sidebar'
  const car_list = useMemo(() => listofUniqueValues(row_data, "car_make"), [row_data]);
  const gender_list = useMemo(() => listofUniqueValues(row_data, "gender"), [row_data]);
  const year_list = useMemo(() => listofUniqueValues(row_data, "car_model_year"),[row_data]);


  return (
    <div className={`sidebar border-end ${style}`}> 
      <div className='list'> 
          <Select
          options={car_list}
          placeholder='Search car'
          className="inputWidth"
          isClearable={true}
          onChange={(e) => {
            dispatch(filter({'car_make':[e ? e.value : null]}))
          }}
          />
          <DropdownMenu/>
          <DropdownRadioGroup label='Year' accesor='car_model_year' list={year_list} />
          <DropdownRadioGroup label='Gender' accesor='gender' list={Array.from(gender_list)} />
          <PriceRange/>
      </div>
    </div>
  )
}

export default Sidebar