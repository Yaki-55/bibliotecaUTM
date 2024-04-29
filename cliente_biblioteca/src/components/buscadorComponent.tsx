import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient';
import '../css/buscador.css';



const BuscadorComponent: React.FC = () => {
    

    const [libros, setLibros] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('titulo');
    const [documentType, setDocumentType] = useState(''); // Nuevo estado para el tipo de documento
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [libroSeleccionado, setLibroSeleccionado] = useState<any | null>(null); // Estado para almacenar el libro seleccionado


    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const query = '*[_type == "libro"]';
        const fetchedLibros = await client.fetch(query);
        console.log('Libros recuperados:', fetchedLibros);
        setLibros(fetchedLibros);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(event.target.value);
    };

    const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentType(event.target.value);
    };

    const handleViewDetails = (libro: any) => {
        setLibroSeleccionado(libro); // Actualiza el estado con el libro seleccionado
        openModal(); // Abre el modal
    };

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let typesToSearch = documentType ? [documentType] : ['libro', 'revista', 'tesis'];
        let query = '';
    
        if (searchTerm) {
            // Ajusta la consulta dependiendo de si "Todo" ha sido seleccionado o un campo específico
            if (searchType === '') {
                // "Todo" está seleccionado
                query = `*[
                    _type in ${JSON.stringify(typesToSearch)} && (
                        titulo match "${searchTerm}*" ||
                        autor match "${searchTerm}*" ||
                        tema match "${searchTerm}*"
                    )
                ]`;
            } else {
                // Un campo específico ha sido seleccionado
                query = `*[
                    _type in ${JSON.stringify(typesToSearch)} && ${searchType} match "${searchTerm}*"
                ]`;
            }
        } else {
            // Si no hay término de búsqueda, recopila todos los elementos de todos los tipos
            query = `*[_type in ${JSON.stringify(typesToSearch)}]`;
        }
        
        try {
            const searchResults = await client.fetch(query);
            console.log(searchResults);
            // Actualiza el estado aquí con los resultados si es necesario
            setLibros(searchResults); // Actualiza el estado con los resultados
            setMostrarResultados(true);  //Activa para poder mostrar los resultados
        } catch (error) {
            console.error("Error fetching data:", error);
            setMostrarResultados(false); 
        }
        
        // Limpia el término de búsqueda después de la búsqueda
        setSearchTerm('');
    };
    
    const renderResultsTable = () => (
        <table className="results-table">
            <thead>
            <tr>
                <th className='hmno'>Autor</th>
                <th className='hmno'>Título</th>
                <th className='hmno'>Código</th>
                <th className='hmno'>Más</th>
            </tr>
            </thead>
            <tbody>
            {libros.map((libro, index) => (
                
                <tr key={index}>
                    <td className='hmno'>{libro.autor}</td>
                    <td className='hmno'>{libro.titulo}</td>
                    <td className='hmno'>{libro.codigo}</td>
                    <td>
                  {/* Aquí iría el botón o enlace para ver más detalles */}
                    <button onClick={() => handleViewDetails(libro)} >Ver más</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
    <div className="buscador-container">
      <div className="home-logo">
        <img
          src="../../public/img/logoUTM.png"
          alt=""
          width="150"
          height="150"
        />
        <h1>Hemeroteca/Biblioteca</h1>
      </div>
      <br></br>
        <form onSubmit={handleSearch}>
        {/* Filtro por Tipo */}

        <div className="inputBuscar-personalizado">
          <div className="imagen-buscar">
            <img
              src="../../public/img/buscar.png"
              alt="Buscar"
              width="40px"
              height="40px"
            />
          </div>
          <div className="inputPersonalizado">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Buscar..."
              autoComplete="off"
            />
          </div>
        </div>
        <div className='hmno'>
            Tipo:
            <label>
            <input
                type="radio"
                name="documentType"
                value="libro"
                checked={documentType === 'libro'}
                onChange={handleDocumentTypeChange}
            />
            Libro
            </label>
            <label>
            <input
                type="radio"
                name="documentType"
                value="revista"
                checked={documentType === 'revista'}
                onChange={handleDocumentTypeChange}
            />
            Revista
            </label>
            <label>
            <input
                type="radio"
                name="documentType"
                value="tesis"
                checked={documentType === 'tesis'}
                onChange={handleDocumentTypeChange}
            />
            Tesis
            </label>
        <label>
            <input
                type="radio"
                name="documentType"
                value=""  // Representa la opción "Todos"
                checked={documentType === ''}
                onChange={handleDocumentTypeChange}
            />
            Todos
        </label>
        </div>
        
        {/* Filtro por Título, Autor, Tema */}
        
        
        <div className='hmno'>
            Buscar por:
            <label>
            <input
                type="radio"
                name="searchType"
                value="titulo"
                checked={searchType === 'titulo'}
                onChange={handleSearchTypeChange}
            />
            Título
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value="autor"
                checked={searchType === 'autor'}
                onChange={handleSearchTypeChange}
            />
            Autor
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value="tema"
                checked={searchType === 'tema'}
                onChange={handleSearchTypeChange}
            />  
            Tema
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value="isbn"
                checked={searchType === 'isbn'}
                onChange={handleSearchTypeChange}
            />
            ISBN
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value="issn"
                checked={searchType === 'issn'}
                onChange={handleSearchTypeChange}
            />
            ISSN
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value="codigo"
                checked={searchType === 'codigo'}
                onChange={handleSearchTypeChange}
            />
            Código
            </label>
            <label>
            <input
                type="radio"
                name="searchType"
                value=""
                checked={searchType === ''}
                onChange={handleSearchTypeChange}
            />
            Todo
            </label>
        </div>
        <button type="submit" className="search-button">Buscar</button>
        </form>
        {/* Tabla de libros aquí */}
        {/* Renderiza la tabla de resultados si hay resultados para mostrar */}
        {mostrarResultados && renderResultsTable()}
        <a href="/" className="salir-libro">Salir</a> 


        {/* Modal */}
      {modalVisible && (
        <div className="modal" >
            {/* Formulario para agregar un nuevo libro */}
              
              <div className="formularioRevista" id="formularioRevista"> 


                <div className="formulario_revista" id="revista_fechaPublicacion">
                  <label className="formulario__label">Edición: </label>
                  <div className="formulario_revista-input">
                    <input type="number" className="formulario__input" value={libroSeleccionado?.edicion || ''} />
                  </div>
                </div>

      
                  <div className="formulario_revista" id="revista_fecha">
                    <label className="formulario__label">Fecha de publicación: </label>
                    <div className="formulario_revista-input">
                      <input type="date" className="formulario__input" value={libroSeleccionado?.fechaPublicacion || ''}  />
                    </div>
                  </div>



                  <div className="formulario_revista" id="revista_Tema">
                    <label  className="formulario__label">Tema: </label>
                    <div className="formulario_revista-input">
                      <input type="text" className="formulario__input" value={libroSeleccionado?.tema|| ''} />
                    </div>
                  </div>

                  <div className="formulario_revista" id="revista_titulo">
                    <label  className="formulario__label">Titulo: </label>
                    <div className="formulario_revista-input">
                      <input type="text" className="formulario__input" value={libroSeleccionado?.titulo || ''} />
                    </div>
                  </div>

                  <div className="formulario_revista" id="revista_autor">
                    <label  className="formulario__label">Autor: </label>
                    <div className="formulario_revista-input">
                      <input type="text" className="formulario__input"   value={libroSeleccionado?.autor || ''}/>
                    </div>
                  </div>

      
                  <div  className="botones">
                    <button type="submit" className="formulario__btn1" onClick={closeModal} >Cancelar</button>
                    <button type="submit" className="formulario__btn2"  >Reservar</button>
                  </div>

            </div>
        </div>
        
      )}

    </div>
    
  );
};

export default BuscadorComponent;