import { useMemo } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import PriceRange from "./PriceRange";
import DropdownMenu from "./DropdownMenu";
import { filter } from "../features/filterSlice";
import { listofUniqueValues } from "../utils/table";
import DropdownRadioGroup from "./DropdownRadioGroup";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { toggle } = useSelector((state) => state.sidebar);
  const row_data = useSelector((state) => state.table.cars);
  const style = toggle ? "" : "hide-sidebar";
  const car_list = useMemo(
    () => listofUniqueValues(row_data, "car_make"),
    [row_data]
  );
  const gender_list = useMemo(
    () => listofUniqueValues(row_data, "gender"),
    [row_data]
  );
  const year_list = useMemo(
    () => listofUniqueValues(row_data, "car_model_year"),
    [row_data]
  );

  return (
    <div className={`sidebar border-end ${style}`}>
      <div className="list">
        <Select
          options={car_list}
          placeholder="Search car"
          className="inputWidth"
          isClearable={true}
          isMulti={true}
          onChange={(e) => {
            const arr = e.map(el => el = el.value)
            console.log(arr)
            dispatch(filter({ car_make: e ? arr : null }));
          }}
        />
        <DropdownMenu />
        <DropdownRadioGroup
          label="Year"
          accesor="car_model_year"
          list={year_list}
        />
        <DropdownRadioGroup
          label="Gender"
          accesor="gender"
          list={Array.from(gender_list)}
        />
        <PriceRange />
      </div>
    </div>
  );
};

export default Sidebar;
