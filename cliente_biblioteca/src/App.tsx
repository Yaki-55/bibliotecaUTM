import MiComponente from './components/MiComponente'; // Ajusta la ruta de importación según la ubicación de MiComponente.tsx
import React from 'react';
import LibroComponent from './components/libroComponent';
import HomeComponent from './components/homeComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/libros" element={<LibroComponent />} />
        {/* Puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  )
}


export default App;
