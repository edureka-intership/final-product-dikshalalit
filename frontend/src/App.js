import './App.css';
import Home from './components/Home/Home';
import {Routes,Route} from 'react-router-dom'
import RestaurantPage from './components/details/RestaurantPage'
import Filter from './components/filter/Filter';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/detail/:cName" element={<RestaurantPage/>}/> 
        <Route path="/filter/:fname" element={<Filter/>}/> 
      </Routes>
    </div>


  );
}

export default App;
