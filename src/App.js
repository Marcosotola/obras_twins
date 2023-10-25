import './App.css';
import Tareas from "./components/Tareas";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <div className='container p-2' >
        <div className='column'>

          <hr />
          <Header />
          <hr />
          <div className=''>
          
            <Tareas />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;