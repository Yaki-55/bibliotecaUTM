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
    <div className="home-container">
      <div className='home-logo'>
        <Link to="/siguientePagina">
          <img src="../../public/img/logoUTM.png" alt="" width="220" height="220" />
        </Link>
        <h1 className='hmno'>Biblioteca Universitaria</h1>
      </div>

      <div className='home-menuImgOpciones'>
        <Link to="/nuevoUsuario">
          <img src="../../public/img/nuevoUsuario.png" alt="" width="150" height="150" />
        </Link>
        <Link to="/buscador">
          <img src="../../public/img/buscar.png" alt="" width="100" height="100" />
        </Link>
        <div onClick={openModal}>
          <img src="../../public/img/nuevaRevista.png" alt="" width="100" height="100" />
        </div>
        <Link to="/prestamos">
          <img src="../../public/img/prestamos.png" alt="" width="100" height="100" />
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
            <Link to="/revistas" className="home-link">Agregar revistas universitarias</Link>
            <p></p>
            <Link to="/libros" className="home-link">Agregar libros</Link>
            <p></p>
            <Link to="/tesis" className="home-link">Agregar tesis</Link>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
