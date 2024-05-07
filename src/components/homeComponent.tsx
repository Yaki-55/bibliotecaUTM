
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { FaSignOutAlt } from "react-icons/fa"; 

const HomeComponent: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="home-container">
      <div className='home-logo'>
        <Link to="/siguientePagina">
          <img src="../../public/img/logoUTM.png" alt="" width="220" height="220" />
        </Link>
        <h1 className='hmno'>Biblioteca Universitaria</h1>
      </div>

      <div className='home-menuImgOpciones'>
        <Link to="/nuevoUsuario">
          <img src="../../public/img/nuevoUsuario.png" alt="" width="100" height="100" />
          <p>Usuarios</p>
        </Link>
        <Link to="/trabajador">
          <img src="../../public/img/buscar.png" alt="" width="100" height="100" />
          <p>Buscador</p>
        </Link>
        <div onClick={openModal} className="home-link2"> {/* Agregamos la clase home-link */}
          <img src="../../public/img/nuevaRevista.png" alt="" width="100" height="100" />
          <p>Inventario</p>
        </div>
        <Link to="/prestamos">
          <img src="../../public/img/prestamos.png" alt="" width="100" height="100" />
          <p>Préstamos</p>
        </Link>
        
      </div>

      <div className='home-menuNameOpciones'>
        <div className='hmno'></div>
        <div></div>
        <div className='hmno'></div>
        <div></div>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <Link to="/revistas" className="home-link3">Agregar revistas universitarias</Link>
            <p></p>
            <Link to="/libros" className="home-link3">Agregar libros</Link>
            <p></p>
            <Link to="/tesis" className="home-link3">Agregar tesis</Link>
            <p></p>
          </div>
        </div>)
      }
      <Link to="/login" className="home-link"> <FaSignOutAlt /> </Link>    
    </div>
  );
};

export default HomeComponent;
