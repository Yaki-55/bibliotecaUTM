import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient'; 
import '../css/tesis.css';

const TesisComponent: React.FC = () => {
    const [tesis, setTesis] = useState<any[]>([]); // Define el estado para almacenar las tesis
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    // Estados para los campos de una nueva tesis
    const [newTesisTitle, setNewTesisTitle] = useState<string>('');
    const [newTesisAuthor, setNewTesisAuthor] = useState<string>('');
    const [newTesisPresentationDate, setNewTesisPresentationDate] = useState<string>('');
    const [newTesisInstitute, setNewTesisInstitute] = useState<string>('');
    const [newTesisNumPages, setNewTesisNumPages] = useState<number | ''>('');
    const [newTesisCode, setNewTesisCode] = useState<string>('');
    const [newTesisIsDonated, setNewTesisIsDonated] = useState<boolean>(false);
    //const [editingTesis, setEditingTesis] = useState(null);

    useEffect(() => {
        const fetchTesis = async () => {
            const query = '*[_type == "tesis"]';
            const tesisData = await client.fetch(query);
            console.log('Tesis recuperadas:', tesisData);
            setTesis(tesisData);
        };
        fetchTesis();
    }, []);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisTitle(event.target.value);
    };
    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisAuthor(event.target.value);
    };
    const handlePresentationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisPresentationDate(event.target.value);
    };
    const handleInstituteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisInstitute(event.target.value);
    };
    const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numPages = parseInt(event.target.value, 10);
        setNewTesisNumPages(numPages >= 0 ? numPages : '');
    };
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisCode(event.target.value);
    };
    const handleIsDonatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTesisIsDonated(event.target.checked);
    };

    // Borrar tesis
    const handleDeleteTesis = async (tesisId: string) => {
        try {
            await client.delete(tesisId);
            setTesis(tesis.filter(tesis => tesis._id !== tesisId));
        } catch (error) {
            console.error('Error al eliminar la tesis:', error);
        }
    };

    // Añadir una nueva tesis
    const handleAddTesis = async () => {
        try {
            const newTesis = {
                _type: 'tesis',
                titulo: newTesisTitle,
                autor: newTesisAuthor,
                fechaPresentacion: newTesisPresentationDate,
                instituto: newTesisInstitute,
                numeroPaginas: newTesisNumPages ? Number(newTesisNumPages) : undefined,
                codigo: newTesisCode,
                donado: newTesisIsDonated,
            };
            const result = await client.create(newTesis);
            setTesis([...tesis, result]);
            // Restablecer formularios después de la adición
            setNewTesisTitle('');
            setNewTesisAuthor('');
            setNewTesisPresentationDate('');
            setNewTesisInstitute('');
            setNewTesisNumPages('');
            setNewTesisCode('');
            setNewTesisIsDonated(false);
        } catch (error) {
            console.error('Error al agregar la tesis:', error);
        }
    };

    return (
        <div className="tesis-container">
            <h1>Gestión de Tesis</h1>
            {/* Tabla para listar las tesis */}
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor(es)</th>
                        <th>Fecha de Presentación</th>
                        <th>Instituto</th>
                        <th>No. de Páginas</th>
                        <th>Código</th>
                        <th>Donado</th>
                        <th>Borrar Tesis</th>
                    </tr>
                </thead>
                <tbody>
                    {tesis.map(tesis => (
                        <tr key={tesis._id}>
                            <td>{tesis.titulo}</td>
                            <td>{tesis.autor}</td>
                            <td>{tesis.fechaPresentacion}</td>
                            <td>{tesis.instituto}</td>
                            <td>{tesis.numeroPaginas}</td>
                            <td>{tesis.codigo}</td>
                            <td>{tesis.donado ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDeleteTesis(tesis._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/" className="salir-tesis">Salir</a>
            <button onClick={openModal}>Agregar Nueva Tesis</button>
            {/* Modal */}
            {modalVisible && (
              <div className="modal">
                <div className="modal-content">
                  {/* Formulario para agregar un nuevo libro */}
                  <h2>Agregar Nueva Tesis</h2>

                  <div className="input-group">
                      <label>Título:</label>
                      <input type="text" placeholder="Título" value={newTesisTitle} onChange={handleTitleChange} />
                  </div>
                  <div className="input-group">
                      <label>Autor:</label>
                      <input type="text" placeholder="Autor" value={newTesisAuthor} onChange={handleAuthorChange} />
                  </div>
                  <div className="input-group">
                       <label>Año de Publicación:</label>
                      <input type="number" placeholder="Año de Publicación" value={newTesisPresentationDate} onChange={handlePresentationDateChange} />
                  </div>
                  <div className="input-group">
                    <label>Código:</label>
                    <input type="text" placeholder="Código" value={newTesisCode} onChange={handleCodeChange} />
                  </div>
                  <div className="input-group">
                    <label>Instituto:</label>
                    <input type="number" placeholder="Edición" value={newTesisInstitute} onChange={handleInstituteChange} />
                  </div>
            
                  {/* Fila de campos de número y checkbox */}
                  <div className="input-group">
                    <label>Número de Páginas:</label>
                    <input type="number" placeholder="Número de Páginas" value={newTesisNumPages} onChange={handleNumPagesChange} />
                  </div>
                  <div className="input-group">
                    <label>Donado:</label>
                    <input type="checkbox" checked={newTesisIsDonated} onChange={handleIsDonatedChange} />
                  </div>
                  
                  <button className="agregar-tesis" onClick={handleAddTesis}>Añadir Tesis</button>
                  
                      <button onClick={closeModal}>Cerrar</button>
                    </div>
                  </div>

            )}
        </div>
    );
};

export default TesisComponent;
