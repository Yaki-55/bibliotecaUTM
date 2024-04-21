import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

const HomeComponent: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="home-wrapper">
      <div className="Inventario" onClick={openModal}>
        <h1>Gestión de inventario</h1>
     
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <Link to="/libros" className="home-link">Ir a la Gestión de Libros</Link>
             <p> </p>
            <Link to="/tesis" className="home-link">Ir a la Gestión de Tesis</Link>
             <p> </p>
           <Link to="/revistas" className="home-link">Ir a la Gestión de Revistas Universitarias</Link>
          </div>
        </div>
      )}

      {/* Otros enlaces al mismo nivel */}
      <Link to="/buscador" className="Búscador">
        <h1>Búscador</h1>
      </Link>

      <Link to="/prestamos" className="Agregar_Usuario">
        <h1>Agregar Usuario</h1>
      </Link>

      <Link to="/prestamos" className="Prestamos">
        <h1>Prestamos</h1>
      </Link>
    </div>
  );
};

export default HomeComponent;
