import { useEffect, useMemo, useState } from "react";
import { listofUniqueValues } from "../utils/table";
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, FormCheck } from "react-bootstrap";
import { filter } from "../features/filterSlice";

const DropdownRadioGroup = ({ accesor, label, list }) => {
  const row_data = useSelector( state => state.table.cars)
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const [didMount, setdidMount] = useState(false);
  console.log(Array.from(list));
  useEffect(() => {
    if (didMount) {
      dispatch(filter({[accesor]: items }))
    } else {
      setdidMount(true);
    }
  }, [items]);
  return (
    <Dropdown style={{ marginBottom: 10 }}>
      <Dropdown.Toggle id="dropdown-basic"> {label} </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "400px",
          width: "fit-content",
          paddingRight: "10px",
        }}
      >
        {list.map((el) => {
          return (
            <FormCheck
              type="checkbox"
              id={el}
              label={el}
              className="dropdown-item"
              onClick={(e) => {
                e.target.checked
                  ? setItems([el, ...items])
                  : setItems(items.filter((e) => e != el));
              }}
            />
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownRadioGroup;