import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { sortRows, filterRows } from "../utils/table";
import Loader from "./Loader.js";

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
        disabled={pageNumber === 0}
        direction="Previous"
        pageNumber={setPageNumber}
      />
      <ChangePageButton
        {...rest}
        disabled={pageNumber === Math.ceil(rowsNumber / rowsPerPage) - 1}
        direction="Next"
        pageNumber={setPageNumber}
      />
    </div>
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

const Table = ({ column_data, rowsPerPage }) => {
  const sort = useSelector((state) => state.sort);
  const row_data = useSelector((state) => state.table.cars);
  const filter = useSelector((state) => state.filter);
  const [pageNumber, setPageNumber] = useState(0);
  const [refScrollLeft, setRefScrollLeft] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const filteredRows = useMemo(
    () => filterRows(row_data, filter),
    [filter, row_data]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort.type, sort.label),
    [sort, filteredRows]
  );

  function fakeRequest() {
    setLoading(true);
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  }

  useEffect(() => {
    fakeRequest().then((_) => {
      setLoading(false);
    });
  }, [sortedRows]);

  return (
    <div>
      <div className="space-x-4"></div>
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
        {isLoading ? (
          <Loader />
        ) : (
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
        )}
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
