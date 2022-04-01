import car_data from './car_tables/car_data'
import column_data from './car_tables/column_data'
import Table from './components/Table'
import MainLayout from './layouts/MainLayout';
function App() {
  return (
    <MainLayout>
    <div className='wrapper' >
      <Table row_data={car_data} column_data={column_data} rowsPerPage={10} />
    </div>
    </MainLayout>
  );
}

export default App;
