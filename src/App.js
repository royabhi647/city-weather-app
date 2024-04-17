import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CitiesTable from './components/CitiesTable/CitiesTable';
import WeatherPage from './components/WeatherPage/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CitiesTable />} />
        <Route path='/weather/:cityName' element={<WeatherPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
