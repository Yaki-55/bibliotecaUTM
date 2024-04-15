//import { useState } from 'react';
import './tesis.css';
//import client from '../client'

function Tesis() {

  return (
    <div className="container">
      <div className="title">REGISTRO DE TESIS</div>
      <form action="" className="formulario" id="formulario">

      
      <div className="formulario_tesis" id="tesis_codigo">
        <label  className="formulario__label">Código</label>
        <div className="formulario_tesis-input">
          <input type="number" className="formulario__input" name="codigoT" id="codigoT" placeholder="# Código" />
        </div>
      </div>



      <div className="formulario_tesis" id="tesis__titulo">
        <label className="formulario__label">Titúlo</label>
        <div className="formulario_tesis-input">
          <input type="text" className="formulario__input" name="titulo" id="titulo" placeholder="Titúlo" />
        </div>
      </div>

      <div className="formulario_tesis" id="tesis_fechaPublicacion">
        <label className="formulario__label">Fecha de publicación</label>
        <div className="formulario_tesis-input">
          <input type="date" className="formulario__input" name="fechaPublic" id="fechaPublic" />
        </div>
      </div>

      
      <div className="formulario_tesis" id="tesis_autor">
        <label className="formulario__label">Autor(es)</label>
        <div className="formulario_tesis-input">
          <input type="text" className="formulario__input" name="autor" id="autor" placeholder="Autor(es)" />
        </div>
      </div>

      <div className="formulario_tesis" id="tesis_NumPaginas">
        <label className="formulario__label">Número de páginas</label>
        <div className="formulario_tesis-input">
          <input type="number" className="formulario__input" name="numPaginas" id="numPaginas" placeholder="No. Paginas" />
        </div>
      </div>

      <div className="formulario_tesis" id="tesis_edicion">
        <label className="formulario__label">Edición</label>
        <div className="formulario_tesis-input">
          <input type="text" className="formulario__input" name="edicion" id="edicion" placeholder="Edición" />
        </div>
      </div>


      <div className="formulario_tesis" id="tesis_instituto">
        <label  className="formulario__label">Instituto</label>
        <div className="formulario_tesis-input">
          <input type="text" className="formulario__input" name="instituto" id="instituto" placeholder="Instituto" />
        </div>
      </div>


      <div className="formulario_tesis" id="tesis_donado">
        <label className="formulario__label">Es donado</label>
        <div className="formulario_tesis-input">
          <label>
            <select className="formulario_Select">
            <option className="value1">Sí</option>
            <option className="value2" >No</option>
            </select>

          </label>
        </div>
      </div>


      
        <button type="submit" className="formulario__btn1">Cancelar</button>
     


      
        <button type="submit" className="formulario__btn2">Aceptar</button>
      
      </form>
    </div>
  );
}
export default Tesis;


