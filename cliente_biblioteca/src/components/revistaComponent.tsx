import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient'; 
import '../css/revista.css';


const RevistaComponent: React.FC = () => {
    const [revistas, setRevistas] = useState<any[]>([]); // Define el estado para almacenar las revistas
    // Estados para los campos de una nueva revista
    const [newRevistaTitle, setNewRevistaTitle] = useState<string>('');
    const [newRevistaAuthor, setNewRevistaAuthor] = useState<string>('');
    const [newRevistaRedaccionDate, setNewRevistaRedaccionDate] = useState<string>('');
    const [newRevistaISSN, setNewRevistaISSN] = useState<string>('');
    const [newRevistaCode, setNewRevistaCode] = useState<string>('');
    const [newRevistaEdition, setNewRevistaEdition] = useState<number | ''>('');
    const [newRevistaNumPages, setNewRevistaNumPages] = useState<number | ''>('');
    const [newRevistaTopic, setNewRevistaTopic] = useState<string>('');
    const [newRevistaAvailableQuantity, setNewRevistaAvailableQuantity] = useState<number | ''>('');
    const [newRevistaIsDonated, setNewRevistaIsDonated] = useState<boolean>(false);
    //const [editingRevista, setEditingRevista] = useState(null);

    useEffect(() => {
        const fetchRevistas = async () => {
            const query = '*[_type == "revista"]';
            const revistasData = await client.fetch(query);
            console.log('Revistas recuperadas:', revistasData);
            setRevistas(revistasData);
        };
        fetchRevistas();
    }, []);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaTitle(event.target.value);
    };
    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaAuthor(event.target.value);
    };
    const handleRedaccionDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaRedaccionDate(event.target.value);
    };
    const handleISSNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaISSN(event.target.value);
    };
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaCode(event.target.value);
    };
    const handleEditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Asegúrate de convertir la entrada a número si es necesario
        const edition = parseInt(event.target.value, 10);
        setNewRevistaEdition(edition >= 0 ? edition : '');
    };
    const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Similar a la edición, convierte la entrada a número
        const numPages = parseInt(event.target.value, 10);
        setNewRevistaNumPages(numPages >= 0 ? numPages : '');
    };
    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaTopic(event.target.value);
    };
    const handleAvailableQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(event.target.value, 10);
        setNewRevistaAvailableQuantity(quantity >= 0 ? quantity : '');
    };
    const handleIsDonatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRevistaIsDonated(event.target.checked);
    };

    // Borrar revista
    const handleDeleteRevista = async (revistaId: string) => {
        try {
            await client.delete(revistaId);
            setRevistas(revistas.filter(revista => revista._id !== revistaId));
        } catch (error) {
            console.error('Error al eliminar la revista:', error);
        }
    };

    // Añadir una nueva revista
    const handleAddRevista = async () => {
        try {
            const newRevista = {
                _type: 'revista',
                titulo: newRevistaTitle,
                autor: newRevistaAuthor,
                fechaRedaccion: newRevistaRedaccionDate,
                issn: newRevistaISSN,
                codigo: newRevistaCode,
                edicion: newRevistaEdition ? Number(newRevistaEdition) : undefined,
                numPaginas: newRevistaNumPages ? Number(newRevistaNumPages) : undefined,
                tema: newRevistaTopic,
                cantidadDisponible: newRevistaAvailableQuantity ? Number(newRevistaAvailableQuantity) : undefined,
                esDonado: newRevistaIsDonated,
            };
            const result = await client.create(newRevista);
            setRevistas([...revistas, result]);
            // Restablecer formularios después de la adición
            setNewRevistaTitle('');
            setNewRevistaAuthor('');
            setNewRevistaRedaccionDate('');
            setNewRevistaISSN('');
            setNewRevistaCode('');
            setNewRevistaEdition('');
            setNewRevistaNumPages('');
            setNewRevistaTopic('');
            setNewRevistaAvailableQuantity('');
            setNewRevistaIsDonated(false);
        } catch (error) {
            console.error('Error al agregar la revista:', error);
        }
    };

    return (
        <div className="revista-container">
            <h1>Gestión de Revistas</h1>
            {/* Tabla para listar las revistas */}
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor(es)</th>
                        <th>Fecha de Redacción</th>
                        <th>ISSN</th>
                        <th>Código</th>
                        <th>Edición</th>
                        <th>Número de Páginas</th>
                        <th>Tema</th>
                        <th>Cantidad Disponible</th>
                        <th>Es Donado</th>
                        <th>Borrar Revista</th>
                    </tr>
                </thead>
                <tbody>
                    {revistas.map(revista => (
                        <tr key={revista._id}>
                            <td>{revista.titulo}</td>
                            <td>{revista.autor}</td>
                            <td>{revista.fechaRedaccion}</td>
                            <td>{revista.issn}</td>
                            <td>{revista.codigo}</td>
                            <td>{revista.edicion}</td>
                            <td>{revista.numPaginas}</td>
                            <td>{revista.tema}</td>
                            <td>{revista.cantidadDisponible}</td>
                            <td>{revista.esDonado ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDeleteRevista(revista._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para agregar una nueva revista */}
            <div className="formulario-revista">
                <h2>Agregar Nueva Revista</h2>

                {/* Fila de campos de texto */}
                <div className="input-group">
                    <label>Título:</label>
                    <input type="text" placeholder="Título" value={newRevistaTitle} onChange={handleTitleChange} />
                </div>
                <div className="input-group">
                    <label>Autor(es):</label>
                    <input type="text" placeholder="Autor(es)" value={newRevistaAuthor} onChange={handleAuthorChange} />
                </div>
                <div className="input-group">
                    <label>Fecha de Redacción:</label>
                    <input type="date" value={newRevistaRedaccionDate} onChange={handleRedaccionDateChange} />
                </div>
                <div className="input-group">
                    <label>ISSN:</label>
                    <input type="text" placeholder="ISSN" value={newRevistaISSN} onChange={handleISSNChange} />
                </div>

                {/* Fila de campos de número */}
                <div className="input-group">
                    <label>Código:</label>
                    <input type="text" placeholder="Código" value={newRevistaCode} onChange={handleCodeChange} />
                </div>
                <div className="input-group">
                    <label>Edición:</label>
                    <input type="number" placeholder="Edición" value={newRevistaEdition} onChange={handleEditionChange} />
                </div>
                <div className="input-group">
                    <label>Número de Páginas:</label>
                    <input type="number" placeholder="Número de Páginas" value={newRevistaNumPages} onChange={handleNumPagesChange} />
                </div>

                {/* Fila de tema */}
                <div className="input-group">
                    <label>Tema:</label>
                    <input type="text" placeholder="Tema" value={newRevistaTopic} onChange={handleTopicChange} />
                </div>
                <div className="input-group">
                    <label>Cantidad Disponible:</label>
                    <input type="number" placeholder="Cantidad Disponible" value={newRevistaAvailableQuantity} onChange={handleAvailableQuantityChange} />
         </div>
                {/* Fila de checkbox */}
                <div className="input-group">
                    <label>Es Donado:</label>
                    <input type="checkbox" checked={newRevistaIsDonated} onChange={handleIsDonatedChange} />
                </div>

                <button className="agregar-revista" onClick={handleAddRevista}>Añadir Revista</button>
                <a href="/" className="salir-revista">Salir</a> 
            </div>
            
        </div>
    );
};

export default RevistaComponent;
