import car_data from './car_tables/car_data'
import column_data from './car_tables/column_data'
import Table from './components/Table'
function App() {
  return (
    <div className='wrapper' >
      <Table row_data={car_data} column_data={column_data} rowsPerPage={20} />
    </div>
  );
}

export default App;
