import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { filter } from "../features/filterSlice";

const PriceRange = () => {
  const [value, setValue] = useState([1000, 1000000]);
  const dispatch = useDispatch()
  return (
    <div style={{width:'100%',paddingLeft:'10px',paddingRight:'10px'}}>
      <Slider
        getAriaLabel={() => "Price Range"}
        valueLabelDisplay="auto"
        value={value}
        min={1000}
        max={100000}
        valueLabelFormat={(value) => `$ ${value}`}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      />
      <button
      className="btn btn-primary"
      style={{ height: "fit-content", marginLeft: '-10px'}}
      onClick={() => dispatch(filter({'real_cost':value}))
      }
      >
      Filter by Price
      </button>
    </div>
  );
};

export default PriceRange;
