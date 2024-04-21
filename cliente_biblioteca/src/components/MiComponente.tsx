import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient';
import './MiComponente.css'; // Importa el archivo CSS

const MiComponente: React.FC = () => {
    const [books, setBooks] = useState<any[]>([]); // Define el estado para almacenar los libros
    const [newBookTitle, setNewBookTitle] = useState<string>(''); // Estado para el título de un nuevo libro
    const [newBookAuthor, setNewBookAuthor] = useState<string>(''); // Estado para el autor de un nuevo libro

    useEffect(() => {
      fetchBooks();
    }, []);

    const fetchBooks = async () => {
      try {
        // Realiza una consulta a Sanity para obtener los libros
        const query = `*[_type == "book"]`; // Filtra los documentos por el tipo de documento "book"
        const fetchedBooks = await client.fetch(query);

        // Actualiza el estado con los libros obtenidos de Sanity
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error al obtener los libros de Sanity:', error);
      }
    };

    const handleAddBook = async () => {
      try {
        // Crea un nuevo documento en Sanity con los datos del nuevo libro
        const newBook = {
          _type: 'book',
          title: newBookTitle,
          author: newBookAuthor,
          // Agrega más campos según sea necesario
        };
        
        // Envía la solicitud para crear el nuevo libro
        await client.create(newBook);

        // Actualiza la lista de libros después de agregar el libro
        setBooks(prevBooks => [...prevBooks, newBook]);

        // Limpia los campos de entrada después de agregar el libro
        setNewBookTitle('');
        setNewBookAuthor('');
      } catch (error) {
        console.error('Error al agregar el libro:', error);
      }
    };

    const handleDeleteBook = async (bookId: string) => {
      try {
        // Elimina el libro localmente
        setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));

        // Elimina el libro de la base de datos
        await client.delete(bookId);
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    };

    return (
      <div className="container"> {/* Agrega la clase "container" para centrar */}
        <div>
          <h2>Libros</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Acciones</th> {/* Nueva columna para los botones de eliminar */}
                {/* Agrega más encabezados según sea necesario */}
              </tr>
            </thead>
            <tbody>
              {books.map((book: any) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button onClick={() => handleDeleteBook(book._id)}>Eliminar</button>
                  </td>
                  {/* Agrega más celdas según sea necesario */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Formulario para agregar un nuevo libro */}
          <div>
            <h3>Agregar nuevo libro</h3>
            <input type="text" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} placeholder="Título del libro" />
            <input type="text" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} placeholder="Autor del libro" />
            <button onClick={handleAddBook}>Agregar libro</button>
          </div>
        </div>
      </div>
    );
};

export default MiComponente;
