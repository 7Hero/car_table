import { Dropdown, Button } from "react-bootstrap";
import { useMemo, useState } from "react";
import { sortRows } from "../utils/table";

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

  const sortedRows = useMemo(
    () => sortRows(row_data, sort.type, sort.label),
    [sort]
  );

  return (
    <div>
      <DropdownMenu style={{ marginBottom: 10 }} setSort={setSort} />

      <div>
        <table>
          <thead>
            <tr>
              {column_data.map((el) => (
                <th key={el.accessor}>{el.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows
              .slice(pageNumber * rowsPerPage, (pageNumber + 1) * rowsPerPage)
              .map((row) => {
                return (
                  <tr>
                    {column_data.map((column) => {
                      return (
                        <td key={row[column.accesor]}>{ `${row[column.accesor]}` }</td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        rowsPerPage={rowsPerPage}
        rowsNumber={row_data.length}
      />
      <p style={{ marginTop: 10 }}>
        Showing {pageNumber * rowsPerPage} to {(pageNumber + 1) * rowsPerPage}{" "}
        of {row_data.length} results
      </p>
    </div>
  );
};

export default Table;
