import { Dropdown, Button, FormCheck } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import {
  sortRows,
  filterRows,
  car_list,
} from "../utils/table";
import Select from "react-select";
const ChangePageButton = ({ direction, pageNumber, disabled }) => {
  const handlePagination = () => {
    switch (direction) {
      case "Next":
        pageNumber((c) => c + 1);
        break;
      case "Previous":
        pageNumber((c) => c - 1);
        break;
    }
  };

  return (
    <Button disabled={disabled} onClick={handlePagination}>
      {direction}
    </Button>
  );
};

const Pagination = ({
  pageNumber,
  setPageNumber,
  rowsPerPage,
  rowsNumber,
  ...rest
}) => {
  return (
    <div className="button_group">
      <ChangePageButton
        {...rest}
        disabled={pageNumber == 0}
        direction="Previous"
        pageNumber={setPageNumber}
      />
      <ChangePageButton
        {...rest}
        disabled={pageNumber == Math.ceil(rowsNumber / rowsPerPage) - 1}
        direction="Next"
        pageNumber={setPageNumber}
      />
    </div>
  );
};

const DropdownRadioGroup = ({ list, accesor, setFilter, label }) => {
  const [items, setItems] = useState([]);
  const [didMount, setdidMount] = useState(false);
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

const DropdownMenu = ({ setSort }) => {
  return (
    <Dropdown style={{ marginBottom: 10 }}>
      <Dropdown.Toggle id="dropdown-basic">Sort</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => setSort({ label: "first_name", type: -1 })}
        >
          First Name (asc.)
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSort({ label: "first_name", type: 1 })}
        >
          First Name (desc.)
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setSort({ label: "last_name", type: -1 })}
        >
          Last Name (asc.)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort({ label: "last_name", type: 1 })}>
          Last Name (desc.)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Table = ({ row_data, column_data, rowsPerPage }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sort, setSort] = useState({ label: "last_name", type: 0 });
  const [filter, setFilter] = useState({});
  const [refScrollLeft, setRefScrollLeft] = useState(0);
  const filteredRows = useMemo(() => filterRows(row_data, filter), [filter]);
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort.type, sort.label),
    [sort, filter]
  );

  return (
    <div>
      <div className="space-x-4">
        <DropdownMenu style={{ marginBottom: 10 }} setSort={setSort} />
        <DropdownRadioGroup
          list={["Male", "Female"]}
          accesor="gender"
          label="Gender"
          setFilter={setFilter}
        />
        {/* <DropdownRadioGroup
          list={car_list}
          accesor="car_make"
          label="Car Maker"
          setFilter={setFilter}
        /> */}
        <Select 
          options={car_list} 
          className='inputWidth'
          onChange={(e)=> setFilter( previous => ({...previous, 'car_make':[e.label]}))}
        />
        {/* <input onChange={(e)=> setFilter( previous => ({...previous, 'car_make':[e.target.value]}))}/> */}
      </div>
      <table style={{ overflow: "hidden" }}>
        <thead
          style={{ transform: `translate3d(-${refScrollLeft}px, 0px, 0px)` }}
        >
          <tr>
            {column_data.map((el) => (
              <th key={el.accesor}>{el.label}</th>
            ))}
          </tr>
        </thead>
        <tbody
          onScroll={(e) => {
            setRefScrollLeft(e.target.scrollLeft);
          }}
        >
          {sortedRows
            .slice(pageNumber * rowsPerPage, (pageNumber + 1) * rowsPerPage)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {column_data.map((column) => {
                    return (
                      <td key={row[column.accesor]}>{`${
                        row[column.accesor]
                      }`}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        rowsPerPage={rowsPerPage}
        rowsNumber={sortedRows.length}
      />
      <p style={{ marginTop: 10 }}>
        Showing {pageNumber * rowsPerPage} to {(pageNumber + 1) * rowsPerPage}{" "}
        of {sortedRows.length} results
      </p>
    </div>
  );
};

export default Table;
