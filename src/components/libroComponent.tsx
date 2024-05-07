import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient';
import '../css/libro.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const LibroComponente: React.FC = () => {
  const [libros, setLibros] = useState<any[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newTitulo, setNewTitulo] = useState<string>('');
  const [newAutor, setNewAutor] = useState<string>('');
  const [newFechaPublicacion, setNewFechaPublicacion] = useState<string>('');
  const [newISBN, setNewISBN] = useState<string>('');
  const [newCodigo, setNewCodigo] = useState<string>('');
  const [newEdicion, setNewEdicion] = useState<number | undefined>(undefined);
  const [newNumPaginas, setNewNumPaginas] = useState<number | undefined>(undefined);
  const [newTema, setNewTema] = useState<string>('');
  const [newCantidadDisponible, setNewCantidadDisponible] = useState<number | undefined>(undefined);
  const [newEsDonado, setNewEsDonado] = useState<boolean>(false);
  const [editingLibro, setEditingLibro] = useState<any>(null);

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const openEditModal = (libro: any) => {
    setEditingLibro(libro); // Establecer el libro que se va a editar
    setNewTitulo(libro.titulo);
    setNewAutor(libro.autor);
    setNewFechaPublicacion(libro.fechaPublicacion);
    setNewISBN(libro.isbn);
    setNewCodigo(libro.codigo);
    setNewEdicion(libro.edicion || 0);
    setNewNumPaginas(libro.numPaginas || 0);
    setNewTema(libro.tema || '');
    setNewCantidadDisponible(libro.cantidadDisponible || 0);
    setNewEsDonado(libro.esDonado || false);
    setEditModalVisible(true); // Abrir el modal de editar libro
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  useEffect(() => {
    const fetchLibros = async () => {
      const query = '*[_type == "libro"]';
      const libros = await client.fetch(query);
      setLibros(libros);
    };
    fetchLibros();
  }, []);

  const handleDeleteLibro = async (libroId: string) => {
    try {
      await client.delete(libroId);
      setLibros(libros.filter(libro => libro._id !== libroId));
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };

  const handleAddLibro = async () => {
    try {
      const newLibro = {
        _type: 'libro',
        titulo: newTitulo,
        autor: newAutor,
        fechaPublicacion: newFechaPublicacion,
        isbn: newISBN,
        codigo: newCodigo,
        edicion: newEdicion,
        numPaginas: newNumPaginas,
        tema: newTema,
        cantidadDisponible: newCantidadDisponible,
        esDonado: newEsDonado,
      };
      const result = await client.create(newLibro);
      setLibros([...libros, result]);
      setNewTitulo('');
      setNewAutor('');
      setNewFechaPublicacion('');
      setNewISBN('');
      setNewCodigo('');
      setNewEdicion(undefined);
      setNewNumPaginas(undefined);
      setNewTema('');
      setNewCantidadDisponible(undefined);
      setNewEsDonado(false);
      closeAddModal();
    } catch (error) {
      console.error('Error al agregar el libro:', error);
    }
  };

  const handleEditLibro = async () => {
  try {
    // Verificar si se ha seleccionado un libro para editar
    if (!editingLibro) {
      console.error('No se ha seleccionado ningún libro para editar.');
      return;
    }

    // Construir el objeto de libro actualizado con los datos del formulario
    const updatedLibro = {
      _type: 'libro',
      _id: editingLibro._id,
      titulo: newTitulo || editingLibro.titulo,
      autor: newAutor || editingLibro.autor,
      fechaPublicacion: newFechaPublicacion || editingLibro.fechaPublicacion,
      isbn: newISBN || editingLibro.isbn,
      codigo: newCodigo || editingLibro.codigo,
      edicion: newEdicion || editingLibro.edicion,
      numPaginas: newNumPaginas || editingLibro.numPaginas,
      tema: newTema || editingLibro.tema,
      cantidadDisponible: newCantidadDisponible || editingLibro.cantidadDisponible,
      esDonado: newEsDonado || editingLibro.esDonado,
    };

    // Realizar la llamada para actualizar el libro en la base de datos
    const response = await client
      .patch(editingLibro._id)
      .set(updatedLibro)
      .commit(); // Confirmar la transacción

    // Verificar si la actualización fue exitosa
    if (response) {
      console.log('Libro actualizado:', updatedLibro);

      // Actualizar la lista de libros localmente
      const updatedLibros = libros.map(libro =>
        libro._id === editingLibro._id ? updatedLibro : libro
      );

      // Actualizar el estado de libros con la lista actualizada
      setLibros(updatedLibros);

      // Limpiar el libro en edición y cerrar el modal
      setEditingLibro(null);
      setEditModalVisible(false);
    } else {
      console.error('Error al actualizar el libro:', response);
    }
  } catch (error) {
    console.error('Error al editar el libro:', error);
  }
};


  return (
    <div className="libro-container">
      <h1>Gestión de Libros</h1>
      <button onClick={openAddModal}>Agregar Nuevo Libro</button>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha Publicación</th>
            <th>ISBN</th>
            <th>Código</th>
            <th>Edición</th>
            <th>Número de Páginas</th>
            <th>Tema</th>
            <th>Cantidad Disponible</th>
            <th>Donado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro._id}>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.fechaPublicacion}</td>
              <td>{libro.isbn}</td>
              <td>{libro.codigo}</td>
              <td>{libro.edicion}</td>
              <td>{libro.numPaginas}</td>
              <td>{libro.tema}</td>
              <td>{libro.cantidadDisponible}</td>
              <td>{libro.esDonado ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleDeleteLibro(libro._id)}><AiFillDelete />Eliminar</button>
                <button onClick={() => openEditModal(libro)}><AiFillEdit />Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/home" className="salir-libro">Salir</a>

      {addModalVisible && (
  <div className="modal">
    <div className="formularioLibro">
      <div className="title">
        <p>Agregar Nuevo Libro</p>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Título: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Título" value={newTitulo} onChange={e => setNewTitulo(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Autor(es): </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Autor(es)" value={newAutor} onChange={e => setNewAutor(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Fecha de Publicación: </label>
        <div className="formulario_libro-input">
          <input type="date" className="formulario__input" placeholder="Fecha de Publicación" value={newFechaPublicacion} onChange={e => setNewFechaPublicacion(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">ISBN: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="ISBN" value={newISBN} onChange={e => setNewISBN(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Código: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Código" value={newCodigo} onChange={e => setNewCodigo(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Edición: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Edición" value={newEdicion} onChange={e => setNewEdicion(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Número de páginas: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Número de páginas" value={newNumPaginas} onChange={e => setNewNumPaginas(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Tema: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Tema" value={newTema} onChange={e => setNewTema(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Cantidad disponible: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Cantidad disponible" value={newCantidadDisponible} onChange={e => setNewCantidadDisponible(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="formulario_libro">
        <label className="formulario__label">Donado: </label>
        <div className="formulario_libro-input">
          <input type="checkbox" checked={newEsDonado} onChange={e => setNewEsDonado(e.target.checked)} />
        </div>
      </div>

      <button type="submit" className="formulario__btn1" onClick={closeAddModal}>Cancelar</button>
      <button type="submit" className="formulario__btn2" onClick={handleAddLibro}>Agregar Libro</button> 
    </div>
   
  </div>
)}

{editModalVisible && (
  <div className="modal">
    <div className="formularioLibro">
      <div className="title">
        <p>Editar Libro</p>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Título: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Título" value={newTitulo} onChange={e => setNewTitulo(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Autor(es): </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Autor(es)" value={newAutor} onChange={e => setNewAutor(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Fecha de Publicación: </label>
        <div className="formulario_libro-input">
          <input type="date" className="formulario__input" placeholder="Fecha de Publicación" value={newFechaPublicacion} onChange={e => setNewFechaPublicacion(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">ISBN: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="ISBN" value={newISBN} onChange={e => setNewISBN(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Código: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Código" value={newCodigo} onChange={e => setNewCodigo(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Edición: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Edición" value={newEdicion || ''} onChange={e => setNewEdicion(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Número de páginas: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Número de páginas" value={newNumPaginas || ''} onChange={e => setNewNumPaginas(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Tema: </label>
        <div className="formulario_libro-input">
          <input type="text" className="formulario__input" placeholder="Tema" value={newTema} onChange={e => setNewTema(e.target.value)} />
        </div>
      </div>
      <div className="formulario_libro">
        <label className="formulario__label">Cantidad disponible: </label>
        <div className="formulario_libro-input">
          <input type="number" className="formulario__input" placeholder="Cantidad disponible" value={newCantidadDisponible || ''} onChange={e => setNewCantidadDisponible(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="formulario_libro">
        <label className="formulario__label">Donado: </label>
        <div className="formulario_libro-input">
          <input type="checkbox" checked={newEsDonado} onChange={e => setNewEsDonado(e.target.checked)} />
        </div>
      </div>

      <button type="submit" className="formulario__btn1" onClick={closeEditModal}>Cancelar</button>
      <button type="submit" className="formulario__btn2" onClick={handleEditLibro}>Guardar Cambios</button>
    </div>
  </div>
)}
  
    </div>
  );
};

export default LibroComponente;
