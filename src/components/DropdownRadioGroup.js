import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown, FormCheck } from "react-bootstrap";
import { filter } from "../features/filterSlice";

const DropdownRadioGroup = ({ accesor, label, list }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [didMount, setdidMount] = useState(false);
  useEffect(() => {
    if (didMount) {
      dispatch(filter({ [accesor]: items }));
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
                  : setItems(items.filter((e) => e !== el));
              }}
            />
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownRadioGroup;
