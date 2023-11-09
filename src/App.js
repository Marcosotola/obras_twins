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
          </Routes>
        </Router>
        <ToastContainer />
        </div>
      </>
      );
}

      export default App;