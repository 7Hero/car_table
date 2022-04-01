import { useMemo } from "react"
import { useSelector } from "react-redux"
import { listofUniqueValues } from "../utils/table"
import DropdownMenu from "./DropdownMenu"
import Select from "react-select";
import { useDispatch } from "react-redux";
import { filter } from "../features/filterSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { toggle } = useSelector( state => state.sidebar)
  const row_data = useSelector( state => state.table.cars)
  const style = toggle ? '' : 'hide-sidebar'
  const car_list = useMemo(() => listofUniqueValues(row_data, "car_make"), [row_data]);
  console.log(car_list)
  return (
    <div className={`sidebar border-end ${style}`}> 
      <div className='list'> 
          <DropdownMenu/>
          <Select
          options={car_list}
          placeholder='Search car'
          className="inputWidth"
          isClearable={true}
          onChange={(e) => {
            dispatch(filter({'car_make':[e ? e.value : null]}))
          }}
        />
      </div>
    </div>
  )
}

export default Sidebar