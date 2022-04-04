import column_data from "./car_tables/column_data";
import Table from "./components/Table";
import MainLayout from "./layouts/MainLayout";

import { useDispatch } from "react-redux";
import { toggle } from "./features/sidebarSlice";
import { useEffect } from "react";
import { CarService } from "./services/car.service";
import { fetchCars } from "./features/tableSlice";


function App() {
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(toggle());
  };
  useEffect(() => {
      CarService.getCars().then( data => {
        dispatch(fetchCars(data))
      })
  },[])
  return (
      <MainLayout>
        <div style={{height:'100vh',padding:'10px'}}>
        <div onClick={toggleSidebar} className='btn btn-primary '> Toggle Sidebar </div>
        <div className="wrapper">
          <Table
            column_data={column_data}
            rowsPerPage={10}
          />
        </div>
        </div>
      </MainLayout>
  );
}

export default App;
