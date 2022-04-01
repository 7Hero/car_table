import { Dropdown, Button, FormCheck } from "react-bootstrap";
import { useEffect, useMemo, useRef, useState } from "react";
import { sortRows, filterRows, listofUniqueValues } from "../utils/table";
import Select from "react-select";
import { Slider } from "@mui/material";
import Loader from './Loader.js'
import { useSelector } from "react-redux";
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

const Table = ({column_data, rowsPerPage }) => {
  const sort = useSelector(state => state.sort)
  const row_data = useSelector( state => state.table.cars);
  const filter = useSelector( state => state.filter)
  const [pageNumber, setPageNumber] = useState(0);
  // const [filter, setFilter] = useState({});
  const [refScrollLeft, setRefScrollLeft] = useState(0);
  const [value, setValue] = useState([1000, 1000000]);
  const [isLoading, setLoading] = useState(true);
  const selectRef = useRef(null);

  const year_list = useMemo(() => listofUniqueValues(row_data, "car_model_year"),[row_data]);
  const car_list = useMemo(() => listofUniqueValues(row_data, "car_make"), [row_data]);

  const filteredRows = useMemo(() => filterRows(row_data, filter), [filter,row_data]);
  const sortedRows = useMemo(() => sortRows(filteredRows, sort.type, sort.label),[sort, filter,row_data]);

  function fakeRequest() {
    setLoading(true);
    return new Promise(resolve => setTimeout(resolve, Math.random()*1000));
  }
  useEffect(() => {
    fakeRequest().then( _ => {
      setLoading(false);
    })
    
  },[sortedRows])

  return (
    <div>
      {/* Filters and Sorts */}
      <div className="space-x-4">
        {/* <DropdownRadioGroup
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
        /> */}

        {/* <Select
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
        /> */}

        {/* <Slider
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
        /> */}
        {/* <button
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
        </button> */}
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
        {isLoading ? <Loader/> : 
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
        </tbody> }
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
