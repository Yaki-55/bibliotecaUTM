import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient'; 
import './libroComponent.css'

const LibroComponent: React.FC = () => {
    const [libros, setLibros] = useState<any[]>([]); // Define el estado para almacenar los libros
    // Estados para los campos de un nuevo libro
    const [newBookTitle, setNewBookTitle] = useState<string>('');
    const [newBookAuthor, setNewBookAuthor] = useState<string>('');
    const [newBookPublicationDate, setNewBookPublicationDate] = useState<string>('');
    const [newBookISBN, setNewBookISBN] = useState<string>('');
    const [newBookCode, setNewBookCode] = useState<string>('');
    const [newBookEdition, setNewBookEdition] = useState<number | ''>('');
    const [newBookNumPages, setNewBookNumPages] = useState<number | ''>('');
    const [newBookTopic, setNewBookTopic] = useState<string>('');
    const [newBookAvailableQuantity, setNewBookAvailableQuantity] = useState<number | ''>('');
    const [newBookIsDonated, setNewBookIsDonated] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const query = '*[_type == "libro"]';
            const libros = await client.fetch(query);
            console.log('Libros recuperados:', libros);
            setLibros(libros);
        };
        fetchBooks();
    }, []);

    
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookTitle(event.target.value);
    };
    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookAuthor(event.target.value);
    };
    const handlePublicationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookPublicationDate(event.target.value);
    };
    const handleISBNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookISBN(event.target.value);
    };
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookCode(event.target.value);
    };
    const handleEditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Asegúrate de convertir la entrada a número si es necesario
        const edition = parseInt(event.target.value, 10);
        setNewBookEdition(edition >= 0 ? edition : '');
    };
    const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Similar a la edición, convierte la entrada a número
        const numPages = parseInt(event.target.value, 10);
        setNewBookNumPages(numPages >= 0 ? numPages : '');
    };
    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookTopic(event.target.value);
    };
    const handleAvailableQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(event.target.value, 10);
        setNewBookAvailableQuantity(quantity >= 0 ? quantity : '');
    };
    const handleIsDonatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBookIsDonated(event.target.checked);
    };
    //borrar libro
    const handleDeleteBook = async (bookId: string) => {
        try {
            await client.delete(bookId);
            setLibros(libros.filter(libro => libro._id !== bookId));
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };
    //añadir un nuveo libro
    const handleAddBook = async () => {
        try {
            const newBook = {
                _type: 'libro',
                titulo: newBookTitle,
                autor: newBookAuthor,
                fechaPublicacion: newBookPublicationDate,
                isbn: newBookISBN,
                codigo: newBookCode,
                edicion: newBookEdition ? Number(newBookEdition) : undefined, // Convirtiendo a número si no está vacío
                numPaginas: newBookNumPages ? Number(newBookNumPages) : undefined,
                tema: newBookTopic,
                cantidadDisponible: newBookAvailableQuantity ? Number(newBookAvailableQuantity) : undefined,
                esDonado: newBookIsDonated,
            };
            const result = await client.create(newBook);
            setLibros([...libros, result]);
            // Restablecer formularios después de la adición
            setNewBookTitle('');
            setNewBookAuthor('');
            setNewBookPublicationDate('');
            setNewBookISBN('');
            setNewBookCode('');
            setNewBookEdition('');
            setNewBookNumPages('');
            setNewBookTopic('');
            setNewBookAvailableQuantity('');
            setNewBookIsDonated(false);
        } catch (error) {
            console.error('Error al agregar el libro:', error);
        }
    };
    return (
        <div className="libro-container">
            <h1>Gestión de Libros</h1>
            {/* Tabla para listar los libros */}
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
                        <th>Borrar Libro</th>
                        <th>Editar Libro</th>
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
                                <button onClick={() => handleDeleteBook(libro._id)}>Eliminar</button>
                            </td>
                            <td>
                                <button >Editar</button> {/* edición */}
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para agregar un nuevo libro */}
            <div className="formulario-libro">
      <h2>Agregar Nuevo Libro</h2>

      {/* Fila de campos de texto */}
      <div className="input-group">
        <label>Título:</label>
        <input type="text" placeholder="Título" value={newBookTitle} onChange={handleTitleChange} />
      </div>
      <div className="input-group">
        <label>Autor:</label>
        <input type="text" placeholder="Autor" value={newBookAuthor} onChange={handleAuthorChange} />
      </div>
      <div className="input-group">
        <label>Año de Publicación:</label>
        <input type="number" placeholder="Año de Publicación" value={newBookPublicationDate} onChange={handlePublicationDateChange} />
      </div>
      
      {/* Fila de campos de texto y número */}
      <div className="input-group">
        <label>ISBN:</label>
        <input type="text" placeholder="ISBN" value={newBookISBN} onChange={handleISBNChange} />
      </div>
      <div className="input-group">
        <label>Código:</label>
        <input type="text" placeholder="Código" value={newBookCode} onChange={handleCodeChange} />
      </div>
      <div className="input-group">
        <label>Edición:</label>
        <input type="number" placeholder="Edición" value={newBookEdition} onChange={handleEditionChange} />
      </div>

      {/* Fila de campos de número y checkbox */}
      <div className="input-group">
        <label>Número de Páginas:</label>
        <input type="number" placeholder="Número de Páginas" value={newBookNumPages} onChange={handleNumPagesChange} />
      </div>
      <div className="input-group">
        <label>Tema:</label>
        <input type="text" placeholder="Tema" value={newBookTopic} onChange={handleTopicChange} />
      </div>
      <div className="input-group">
        <label>Cantidad Disponible:</label>
        <input type="number" placeholder="Cantidad Disponible" value={newBookAvailableQuantity} onChange={handleAvailableQuantityChange} />
      </div>

      <div className="input-group">
        <label>Donado:</label>
        <input type="checkbox" checked={newBookIsDonated} onChange={handleIsDonatedChange} />
      </div>

      <button className="agregar-libro" onClick={handleAddBook}>Añadir Libro</button>
      {/* Utiliza el componente Link para navegar al inicio o un enlace tradicional si no usas react-router-dom */}
      <a href="/" className="salir-libro">Salir</a> 
    </div>
        </div>
    );
};
export default LibroComponent;
