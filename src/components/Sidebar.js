import { useSelector } from "react-redux"
import { listofUniqueValues } from "../utils/table"
import DropdownMenu from "./DropdownMenu"

const Sidebar = () => {
  const { toggle } = useSelector( state => state.sidebar)
  const style = toggle ? '' : 'hide-sidebar'
  const car_list = useMemo(() => listofUniqueValues(row_data, "car_make"), []);

  return (
    <div className={`sidebar border-end ${style}`}> 
      <div className='list'> 
          <DropdownMenu/>
          <Select
          options={car_list}
          className="inputWidth"
          isClearable={true}
          onChange={(e) => {
            setFilter((previous) => ({
              ...previous,
              car_make: [e ? e.value : null],
            }));
          }}
        />
      </div>
    </div>
  )
}

export default Sidebar