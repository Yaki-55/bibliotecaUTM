import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient';
import '../css/tesis.css';

const TesisComponent: React.FC = () => {
    const [tesis, setTesis] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTesis, setEditingTesis] = useState<any>(null);
    const [newTesisTitle, setNewTesisTitle] = useState<string>('');
    const [newTesisAuthor, setNewTesisAuthor] = useState<string>('');
    const [newTesisPresentationDate, setNewTesisPresentationDate] = useState<string>('');
    const [newTesisInstitute, setNewTesisInstitute] = useState<string>('');
    const [newTesisNumPages, setNewTesisNumPages] = useState<number | ''>('');
    const [newTesisCode, setNewTesisCode] = useState<string>('');
    const [newTesisIsDonated, setNewTesisIsDonated] = useState<boolean>(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingTesis(null);
        resetForm();
    };

    const resetForm = () => {
        setNewTesisTitle('');
        setNewTesisAuthor('');
        setNewTesisPresentationDate('');
        setNewTesisInstitute('');
        setNewTesisNumPages('');
        setNewTesisCode('');
        setNewTesisIsDonated(false);
    };

    useEffect(() => {
        const fetchTesis = async () => {
            const query = '*[_type == "tesis"]';
            const tesisData = await client.fetch(query);
            setTesis(tesisData);
        };
        fetchTesis();
    }, []);

    const handleEditTesis = (tesis: any) => {
        setEditingTesis(tesis);
        setNewTesisTitle(tesis.titulo);
        setNewTesisAuthor(tesis.autor);
        setNewTesisPresentationDate(tesis.fechaPresentacion);
        setNewTesisInstitute(tesis.instituto);
        setNewTesisNumPages(tesis.numeroPaginas);
        setNewTesisCode(tesis.codigo);
        setNewTesisIsDonated(tesis.donado);
        openModal();
    };

    const handleDeleteTesis = async (tesisId: string) => {
        try {
            await client.delete(tesisId);
            setTesis(tesis.filter(tesis => tesis._id !== tesisId));
        } catch (error) {
            console.error('Error al eliminar la tesis:', error);
        }
    };

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
            closeModal();
        } catch (error) {
            console.error('Error al agregar la tesis:', error);
        }
    };

    const handleUpdateTesis = async () => {
        try {
            if (!editingTesis) {
                console.error('No se ha seleccionado ninguna tesis para editar.');
                return;
            }

            const updatedTesis = {
                _type: 'tesis',
                _id: editingTesis._id,
                titulo: newTesisTitle,
                autor: newTesisAuthor,
                fechaPresentacion: newTesisPresentationDate,
                instituto: newTesisInstitute,
                numeroPaginas: newTesisNumPages ? Number(newTesisNumPages) : undefined,
                codigo: newTesisCode,
                donado: newTesisIsDonated,
            };

            const response = await client
                .patch(editingTesis._id)
                .set(updatedTesis)
                .commit();

            if (response) {
                const updatedTesisList = tesis.map(t => (t._id === editingTesis._id ? updatedTesis : t));
                setTesis(updatedTesisList);
                closeModal();
            } else {
                console.error('Error al actualizar la tesis:', response);
            }
        } catch (error) {
            console.error('Error al editar la tesis:', error);
        }
    };

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

    return (
        <div className="tesis-container">
            <h1>Gestión de Tesis</h1>
            <button onClick={openModal}>Agregar Nueva Tesis</button>  
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
                        <th>Acciones</th>
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
                                <button onClick={() => handleEditTesis(tesis)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <a href="/home" className="salir-libro">Salir</a>
            {modalVisible && (
                <div className="tesis-modal">
                    <div className="tesis-modal-content">
                        <span className="tesis-close" onClick={closeModal}>&times;</span>
                        <h2>{editingTesis ? 'Editar Tesis' : 'Agregar Nueva Tesis'}</h2>
                        <div>
                            <label>Título:</label>
                            <input type="text" value={newTesisTitle} onChange={handleTitleChange} />
                        </div>
                        <div>
                            <label>Autor(es):</label>
                            <input type="text" value={newTesisAuthor} onChange={handleAuthorChange} />
                        </div>
                        <div>
                            <label>Fecha de Presentación:</label>
                            <input type="date" value={newTesisPresentationDate} onChange={handlePresentationDateChange} />
                        </div>
                        <div>
                            <label>Instituto:</label>
                            <input type="text" value={newTesisInstitute} onChange={handleInstituteChange} />
                        </div>
                        <div>
                            <label>No. de Páginas:</label>
                            <input type="number" value={newTesisNumPages} onChange={handleNumPagesChange} />
                        </div>
                        <div>
                            <label>Código:</label>
                            <input type="text" value={newTesisCode} onChange={handleCodeChange} />
                        </div>
                        <div>
                            <label>Donado:</label>
                            <input type="checkbox" checked={newTesisIsDonated} onChange={handleIsDonatedChange} />
                        </div>
                        <div className="tesis-buttons">
                            <button onClick={editingTesis ? handleUpdateTesis : handleAddTesis}>
                                {editingTesis ? 'Guardar Cambios' : 'Agregar'}
                            </button>
                            <button onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TesisComponent;
