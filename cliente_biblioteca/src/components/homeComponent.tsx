import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Biblioteca</h1>
      <p>Este es el sistema de gestión de tu biblioteca.</p>
      <Link to="/libros" className="home-link">Ir a la Gestión de Libros</Link>
    </div>
  );
};

export default HomeComponent;
