import LibroComponent from './components/libroComponent';
import HomeComponent from './components/homeComponent';
import TesisComponent from './components/tesisComponent';
import RevistaComponent from './components/revistaComponent';
import BuscadorComponent from './components/buscadorComponent';
import LoginComponent from './components/loginComponente';
import TrabajadorComponent from './components/trabajadorComponent';
import UsuarioComponent from './components/usuarioComponent';
import ReservaQRComponent from './components/reservaQRComponent';
import ReservasComponent from './components/reservasComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginComponent/>} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/libros" element={<LibroComponent />} />
        <Route path="/tesis" element={<TesisComponent/>} />
        <Route path="/revistas" element={<RevistaComponent />} />
        <Route path="/buscador" element={<BuscadorComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/trabajador" element={<TrabajadorComponent />} />
        <Route path="/nuevoUsuario" element={<UsuarioComponent />} />
        <Route path="/reservas/:id" element={<ReservaQRComponent />} />
        <Route path="/prestamos" element={<ReservasComponent />} />

      </Routes>
    </Router>
  )
}


export default App;
