import LibroComponent from './components/libroComponent';
import HomeComponent from './components/homeComponent';
import TesisComponent from './components/tesisComponent';
import RevistaComponent from './components/revistaComponent';
import BuscadorComponent from './components/buscadorComponent';
import React from 'react';
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
        <Route path="/tesis" element={<TesisComponent/>} />
        <Route path="/revistas" element={<RevistaComponent />} />
        <Route path="/buscador" element={<BuscadorComponent />} />
      </Routes>
    </Router>
  )
}


export default App;
