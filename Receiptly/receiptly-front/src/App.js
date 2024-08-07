import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import History from "./Pages/History";
import Products from "./Pages/Products";
import CurrentRecepits from "./Pages/CurrentRecepits";
import './App.css'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/yourProducts" element={<Products />}/>
          <Route path="/currentRecepits" element={<CurrentRecepits />}/>
        </Routes>
    </div>
  );
}

export default App;
