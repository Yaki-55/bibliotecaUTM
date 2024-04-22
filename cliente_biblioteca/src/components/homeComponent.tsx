import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import '../css/home.css'

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
        <img src="../../public/img/logoUTM.png" alt="" width="220" height="220" />
        <h1 className='hmno'>Biblioteca Universitaria</h1>
      </div>
      
      <div className='home-menuImgOpciones'>
        <img src="../../public/img/nuevoUsuario.png" alt="" width="100" height="100" />
        <img src="../../public/img/buscar.png" alt="" width="100" height="100" />
        <img src="../../public/img/nuevaRevista.png" alt="" width="100" height="100" />
        <img src="../../public/img/prestamos.png" alt="" width="100" height="100" />
      </div>
      
      <div className='home-menuNameOpciones'>
        <div className='hmno'><h2> Nuevo usuario</h2></div>
        <div><Link to="/buscador" className="hmno"><h2>Buscar</h2></Link></div>
        <div className='hmno' onClick={openModal}><h2>Agregar</h2>{modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <Link to="/libros" className="home-link">Agregar libros</Link>
             <p> </p>
            <Link to="/tesis" className="home-link">Agregar tesis</Link>
             <p> </p>
           <Link to="/revistas" className="home-link">Agregar revistas universitarias</Link>
          </div>
        </div>
      )}</div>
        <div className='hmno'><h2> Préstamos</h2></div>
      </div>
    </div>
  );
};

export default HomeComponent;