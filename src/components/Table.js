import { Dropdown, Button, FormCheck } from "react-bootstrap";
import { useEffect, useMemo, useRef, useState } from "react";
import { sortRows, filterRows, listofUniqueValues } from "../utils/table";
import YearPicker from "@mui/lab/YearPicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Select from "react-select";
import { Slider } from "@mui/material";
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

const RangePicker = ({ options }) => {
  const { min, max } = options;
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  return (
    <div style={{ width: "300px", position: "relative" }}>
      <div className="slider">
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: `${((minValue - min) / (max - min)) * 100}%-5px`,
          }}
        >
          {" "}
          {minValue}{" "}
        </div>
        <div
          className="progress"
          style={{
            left: `${((minValue - min) * 100) / (max - min) + 1}%`,
            right: `${101 - ((maxValue - min) * 100) / (max - min)}%`,
          }}
        ></div>
      </div>
      <div className="rangeslider">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => {
            setMinValue(e.target.value);
          }}
        ></input>
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => {
            setMaxValue(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};
const Table = ({ row_data, column_data, rowsPerPage }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sort, setSort] = useState({ label: "last_name", type: 0 });
  const [filter, setFilter] = useState({});
  const [value, setValue] = useState([1000, 1000000]);
  const selectRef = useRef(null);
  const [refScrollLeft, setRefScrollLeft] = useState(0);
  const filteredRows = useMemo(() => filterRows(row_data, filter), [filter]);
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort.type, sort.label),
    [sort, filter]
  );

  const year_list = useMemo(
    () => listofUniqueValues(row_data, "car_model_year"),
    []
  );
  const car_list = useMemo(() => listofUniqueValues(row_data, "car_make"), []);
  return (
    <div>
      {/* Filters and Sorts */}
      <div className="space-x-4">
        <DropdownMenu style={{ marginBottom: 10 }} setSort={setSort} />
        <DropdownRadioGroup
          list={["Male", "Female"]}
          accesor="gender"
          label="Gender"
          setFilter={setFilter}
        />
        <DropdownRadioGroup
          list={year_list}
          accesor="car_model_year"
          label="Year"
          setFilter={setFilter}
        />

        <Select
          ref={selectRef}
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
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <YearPicker sx={{width:300}}
          date={Date.now()}
          isDateDisabled={() => false}
          minDate={new Date('1957-01-01T00:00:00.000')}
          maxDate={new Date('2022-01-01T00:00:00.000')}
          onChange={ (newDate) => console.log(newDate)}
        />
        </LocalizationProvider> */}
        {/* <RangePicker options={{min:1000,max:10000}} /> */}
        <Slider
          getAriaLabel={() => "Price Range"}
          valueLabelDisplay="auto"
          value={value}
          min={1000}
          max={100000}
          sx={{ maxWidth: 300, py: 2.5, mx: "20px" }}
          valueLabelFormat={(value) => `$ ${value}`}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
        />
        <button
          className="btn btn-primary"
          style={{ height: "fit-content" }}
          onClick={() =>
            setFilter((previous) => ({
              ...previous,
              real_cost: value,
            }))
          }
        >
          {" "}
          Filter by Price
        </button>
      </div>
      {/* Table */}
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
      {/* Pagination */}
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
