import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sort } from "../features/sortSlice";
const DropdownMenu = () => {
  const dispatch = useDispatch();
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Sort</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => dispatch(sort({ label: "first_name", type: -1 }))}
        >
          First Name (asc.)
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(sort({ label: "first_name", type: 1 }))}
        >
          First Name (desc.)
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(sort({ label: "last_name", type: -1 }))}
        >
          Last Name (asc.)
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(sort({ label: "last_name", type: 1 }))}
        >
          Last Name (desc.)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
