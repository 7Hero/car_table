import car_data from "./car_tables/car_data";
import column_data from "./car_tables/column_data";
import Table from "./components/Table";
import MainLayout from "./layouts/MainLayout";

import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./features/sidebarSlice";

function App() {
  // const sidebarState = useSelector( state => state.sidebar);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(toggle());
  };
  return (
      <MainLayout>
        <div style={{height:'100vh',padding:'10px'}}>
        <div onClick={toggleSidebar} className='btn btn-primary '> Toggle Sidebar </div>
        <div className="wrapper">
          <Table
            row_data={car_data}
            column_data={column_data}
            rowsPerPage={10}
          />
        </div>
        </div>
      </MainLayout>
  );
}

export default App;
