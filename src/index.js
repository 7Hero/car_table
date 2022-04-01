import { StrictMode } from "react";
import { render } from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { fetchCars } from './features/tableSlice'
import { CarService } from "./services/car.service";

import App from "./App";
import "./custom.scss";


render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById("root")
);
