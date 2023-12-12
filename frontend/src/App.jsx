import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashMain from "./pages/dashboard/dashMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss'
import Servisai from "./pages/dashboard/sub-sections/servisai";
import Meistrai from "./pages/dashboard/sub-sections/meistrai";
import Vartotojai from "./pages/dashboard/sub-sections/vartotojai";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<DashMain/>}></Route>
          <Route path="/admin/servisai" element={<Servisai />} />
          <Route path="/admin/meistrai" element={<Meistrai />} />
          <Route path="/admin/vartotojai" element={<Vartotojai />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
