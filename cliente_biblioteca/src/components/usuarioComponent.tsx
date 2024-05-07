import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient'; 
import '../css/usuario.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const UsuarioComponent: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPassword, setNewUserPassword] = useState<string>('');
  const [newUserType, setNewUserType] = useState<string>('');
  const [editingUser, setEditingUser] = useState<any>(null); // Estado para almacenar el usuario que se está editando

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      const query = '*[_type == "usuario"]';
      const usuarios = await client.fetch(query);
      console.log('Usuarios recuperados:', usuarios);
      setUsuarios(usuarios);
    };
    fetchUsuarios();
  }, []);

  const handleDeleteUsuario = async (usuarioId: string) => {
    try {
      await client.delete(usuarioId);
      setUsuarios(usuarios.filter(usuario => usuario._id !== usuarioId));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleAddUsuario = async () => {
    try {
      const newUsuario = {
        _type: 'usuario',
        nombre: newUserName,
        correo: newUserEmail,
        contrasena: newUserPassword,
        tipo_usuario: newUserType,
      };
      const result = await client.create(newUsuario);
      setUsuarios([...usuarios, result]);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserType('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const handleEditClick = (usuario: any) => {
    console.log('Usuario seleccionado para editar:', usuario);
    setEditingUser(usuario); // Establecer el usuario que se va a editar
    setNewUserName(usuario.nombre);
    setNewUserEmail(usuario.correo);
    setNewUserPassword(usuario.contrasena);
    setNewUserType(usuario.tipo_usuario);
    openModal(); // Abrir el modal para editar usuario
  };

  const handleEditUsuario = async () => {
    try {
      // Verificar si se ha seleccionado un usuario para editar
      if (!editingUser) {
        console.error('No se ha seleccionado ningún usuario para editar.');
        return;
      }
  
      // Construir el objeto de usuario actualizado con los datos del formulario
      const updatedUsuario = {
        _type: 'usuario',
        _id: editingUser._id,
        nombre: newUserName || editingUser.nombre,
        correo: newUserEmail || editingUser.correo,
        contrasena: newUserPassword || editingUser.contrasena,
        tipo_usuario: newUserType || editingUser.tipo_usuario,
      };
  
      // Realizar la llamada para actualizar el usuario en la base de datos de Sanity
      const response = await client
        .patch(editingUser._id)
        .set(updatedUsuario)
        .commit(); // Confirmar la transacción
  
      // Verificar si la actualización fue exitosa
      if (response) {
        console.log('Usuario actualizado:', updatedUsuario);
        
        // Actualizar la lista de usuarios localmente
        const updatedUsuarios = usuarios.map(usuario =>
          usuario._id === editingUser._id ? updatedUsuario : usuario
        );
  
        // Actualizar el estado de usuarios con la lista actualizada
        setUsuarios(updatedUsuarios);
  
        // Limpiar el usuario en edición y cerrar el modal
        setEditingUser(null);
        closeModal();
      } else {
        console.error('Error al actualizar el usuario:', response);
      }
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };
  
  
  return (
    <div className="cuadrosupermo" style={{ overflowY: 'auto', height: 'calc(100vh - 40px)', display: 'flex', justifyContent: 'center' }}> 
      <div className="usuario-container">
        <h1>Gestión de Usuarios</h1>
        <button onClick={openModal}>Agregar Nuevo Usuario</button>
        {usuarios.map((usuario, index) => (
          <React.Fragment key={usuario._id}>
            {/* Encabezado */}
            <table style={{ height: `${100 / usuarios.length}%` }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Tipo de Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Datos del usuario */}
                <tr>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipo_usuario}</td>
                  <td>
                    <button onClick={() => handleDeleteUsuario(usuario._id)}><AiFillDelete />Eliminar</button>
                    <button onClick={() => handleEditClick(usuario)}><AiFillEdit />Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Separador */}
            {index < usuarios.length - 1 && (
              <hr style={{ margin: "20px 0" }} />
            )}
          </React.Fragment>
        ))}
        <a href="/home" className="salir-revista">Salir</a> 

        {modalVisible && (
          <div className="modal">
            <div className="formularioUsuario">
              <div className="title">
                <p>{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</p>
                <p></p>
              </div>
              <div className="formulario_usuario">
                <p></p>
                <label className="formulario__label">Nombre: </label>
                <div className="formulario_usuario-input">
                  <input type="text" className="formulario__input" placeholder="Nombre" value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                </div>
              </div>
              <div className="formulario_usuario">
                <label className="formulario__label">Correo Electrónico: </label>
                <div className="formulario_usuario-input">
                  <input type="email" className="formulario__input" placeholder="Correo Electrónico" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                </div>
              </div>
              <div className="formulario_usuario">
                <label className="formulario__label">Contraseña: </label>
                <div className="formulario_usuario-input">
                  <input type="password" className="formulario__input" placeholder="Contraseña" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} />
                </div>
              </div>
              <div className="formulario_usuario">
                <label className="formulario__label">Tipo de Usuario: </label>
                <div className="formulario_usuario-input">
                  <select value={newUserType} onChange={e => setNewUserType(e.target.value)}>
                    <option value="administrador">Administrador</option>
                    <option value="trabajador">Trabajador</option>
                    <option value="alumno">Alumno</option>
                  </select>
                  <button type="submit" className="formulario__btn1" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className="formulario__btn2" onClick={editingUser ? handleEditUsuario : handleAddUsuario}>
                    {editingUser ? 'Guardar Cambios' : 'Agregar Usuario'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuarioComponent;
