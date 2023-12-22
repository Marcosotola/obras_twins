import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tareas from "./pages/Tareas";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./sections/Header/Header";
import Home from './pages/Home';
import Materiales from './pages/Materiales';
import Recordatorios from './pages/Recordatorios';
import Planos from './pages/Planos';
import Avance from './pages/Avance';
import Remito from './pages/Remito';
import Remitos from './pages/Remitos';
import PisoMenos2 from './pages/PisoMenos2';
import PisoMenos1 from './pages/PisoMenos1';
import Piso0tj from './pages/Piso0tj';
import Piso0vs from './pages/Piso0vs';
import Piso1 from './pages/Piso1';
import Piso2 from './pages/Piso2';
import Piso8 from './pages/Piso8';

function App() {
  return (
    <>
      <div className='container p-2' >
        <Router>
          <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/Tareas" element={<Tareas />} />
            <Route path="/Materiales" element={<Materiales />} />
            <Route path="/Recordatorios" element={<Recordatorios />} />
            <Route path="/Planos" element={<Planos />} />
            <Route path="/Avance" element={<Avance />} />
            <Route path="/Remito" element={<Remito />} />
            <Route path="/Remitos" element={<Remitos />} />
            <Route path="/PisoMenos2" element={<PisoMenos2 />} />
            <Route path="/PisoMenos1" element={<PisoMenos1 />} />
            <Route path="/Piso0tj" element={<Piso0tj />} />
            <Route path="/Piso0vs" element={<Piso0vs />} />
            <Route path="/Piso1" element={<Piso1 />} />
            <Route path="/Piso2" element={<Piso2 />} />
            <Route path="/Piso8" element={<Piso8 />} />
          </Routes>
        </Router>
        <ToastContainer />
        </div>
      </>
      );
}

      export default App;