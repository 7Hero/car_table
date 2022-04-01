import { useMemo } from "react";
import { listofUniqueValues } from "../utils/table";

const DropdownRadioGroup = ({ accesor, label }) => {
  const [items, setItems] = useState([]);
  const [didMount, setdidMount] = useState(false);
  const list = useMemo(() => listofUniqueValues(row_data, "car_model_year"),[row_data]);
  useEffect(() => {
    if (didMount) {
      setFilter((previous) => ({ ...previous, [accesor]: items }));
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