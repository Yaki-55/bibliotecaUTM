import React, { useEffect, useState } from "react";
import client from "../utils/sanityClient";
//import CrearQR from './crearQR';
import "../css/buscador.css";

const BuscadorComponent: React.FC = () => {
  const [libros, setLibros] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("titulo");
  const [documentType, setDocumentType] = useState(""); // Nuevo estado para el tipo de documento
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState<any>(null);
  ////////////////////////////////////////////////////
  const [reservas, setReservas] = useState<any[]>([]);
  const [fechaReservacion, setFechaReservacion] = useState<string>('');
  const [fechaEntrega, setFechaEntrega] = useState<string>('');
  const [libroSeleccionadoId, setLibroSeleccionadoId] = useState<string>('');

  //const [urlReserva, setUrlReserva] = React.useState(''); // Estado para la URL de la reserva
  //const [showQR, setShowQR] = React.useState(false); // Estado para mostrar el QR
  const [tituloLibro, setTituloLibro] = useState<string>('');
  

  const obtenerTituloDeLibro = async (libroId: string): Promise<string> => {
    try {
      // Obtener el libro correspondiente al ID proporcionado
      const libro = await client.fetch(`*[_type == 'libro' && _id == $libroId][0]`, { libroId });
  
      // Extraer el título del libro
      const titulo = libro?.titulo || '';
  
      // Devolver solo el título del libro
      return titulo;
    } catch (error:any) {
      console.error('Error al obtener el título del libro:', error.message);
      return ''; // Devolver un valor predeterminado en caso de error
    }
  };
  const doNothing = async (id: string) => {
    id;
  }

  const openModal1 = (libro: any) => {
    setLibroSeleccionado(libro);
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const openModal2 = async (libro: any) => {
    setLibroSeleccionado(libro);
    setModalVisible1(false);

    // Asignar el _id del libro seleccionado
    setLibroSeleccionadoId(libro._id);

  // Obtener título y tipo del libro seleccionado
  const titulo = await obtenerTituloDeLibro(libro._id);
    const tit2=tituloLibro
    setTituloLibro(titulo);
    setModalVisible2(true);
    doNothing(tit2);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const query = '*[_type == "libro"]';
    const fetchedLibros = await client.fetch(query);
    console.log("Libros recuperados:", fetchedLibros);
    setLibros(fetchedLibros);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchType(event.target.value);
  };

  const handleDocumentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentType(event.target.value);
  };

  /////////////////////////
  const handleFechaReservacionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFechaReservacion(event.target.value);
  };

  const handleFechaEntregaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFechaEntrega(event.target.value);
  };

  const handleReservar = async () => {
    try {
      // Crear un nuevo documento de reserva en Sanity
      const alumnoNombre = localStorage.getItem('alumnoNombre');

      const reserva = {
        _type: "reserva", // Tipo de documento
        nombreAlumno: alumnoNombre,
        //usuario: idAlumno, // 
        titulo: {
          _type: "reference",
          _ref: libroSeleccionadoId, // 
        },
        fechaInicio: fechaReservacion, // Fecha de reservación
        fechaFin: fechaEntrega, // Fecha de entrega
      };
  
      // Enviar la solicitud para crear la reserva utilizando el cliente de Sanity
      const resultado = await client.create(reserva);
      setReservas([...reservas, resultado]);
  
      // Limpiar los estados después de crear la reserva
      setLibroSeleccionado(null);
      setFechaReservacion('');
      setFechaEntrega('');
  
      // Registro en la consola para confirmar que la reserva se ha guardado
      console.log("Reserva guardada:", resultado);
      //const nuevaUrlReserva = `localhost:5173/reservas/`+ resultado._id;
      //console.log("URL: ", nuevaUrlReserva);
      //setUrlReserva(nuevaUrlReserva);
      window.location.href = '/reservas/'+ resultado._id ;
      //setShowQR(true);
    } catch (error) {
      // Si hay algún error, imprimirlo en la consola
      console.error("Error al guardar la reserva:", error);
    }
  };
  
  ////////////////////////

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let typesToSearch = documentType
      ? [documentType]
      : ["libro", "revista", "tesis"];
    let query = "";

    if (searchTerm) {
      // Ajusta la consulta dependiendo de si "Todo" ha sido seleccionado o un campo específico
      if (searchType === "") {
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
                    _type in ${JSON.stringify(
                      typesToSearch
                    )} && ${searchType} match "${searchTerm}*"
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
      setMostrarResultados(true); //Activa para poder mostrar los resultados
    } catch (error) {
      console.error("Error fetching data:", error);
      setMostrarResultados(false);
    }

    // Limpia el término de búsqueda después de la búsqueda
    setSearchTerm("");
  };

  const renderResultsTable = () => (
    <table className="results-table">
      <thead>
        <tr>
          <th>Autor</th>
          <th>Título</th>
          <th>Código</th>
          <th>Más</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro, index) => (
          <tr key={index}>
            <td>{libro.autor}</td>
            <td>{libro.titulo}</td>
            <td>{libro.codigo}</td>
            <td>
              {/* Aquí iría el botón o enlace para ver más detalles */}
              <button onClick={() => openModal1(libro)}>Ver más</button>
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
          width="200"
          height="200"
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
              type="text1"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Buscar..."
              autoComplete="off"
            />
          </div>
        </div>

        <div className="buscador-container-tipos"> 
          <label>
            <h4> Tipo:   </h4>
            <input
              type="radio"
              name="documentType"
              value="libro"
              checked={documentType === "libro"}
              onChange={handleDocumentTypeChange}
            />
            <h4>Libro</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="revista"
              checked={documentType === "revista"}
              onChange={handleDocumentTypeChange}
            />
            <h4>Revista</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="tesis"
              checked={documentType === "tesis"}
              onChange={handleDocumentTypeChange}
            />
            <h4>Tesis</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="" // Representa la opción "Todos"
              checked={documentType === ""}
              onChange={handleDocumentTypeChange}
            />
            <h4>Todos</h4>
          </label>
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

        </div>

        {/* Filtro por Título, Autor, Tema */}
        {         
        <div className="oraoraora">
            
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
        </div> }
        {mostrarResultados && renderResultsTable()}
        <button type="submit" className="search-button">
        Buscar
        </button>
        
        <a href="/home" className="exit-button">
          SALIR
        </a>
      </form>
      {/* Tabla de libros aquí */}
      {/* Renderiza la tabla de resultados si hay resultados para mostrar */}


      {modalVisible1 && (
        <div className="modal">
          <div className="formularioRevista" id="formularioRevista">

            <div className="hmno" id="revista_fechaPublicacion">
              <label className="formulario__label">Edición: </label>
              <div className="formulario_revista-input">
                <input
                  type="number"
                  className="formulario__input"
                  value={libroSeleccionado?.edicion || "1"}
                />
              </div>
            </div>
            <div className="hmno" id="revista_fecha">
              <label className="formulario__label">
                Fecha de publicación:{" "}
              </label>
              <div className="formulario_revista-input">
                <input
                  type="date"
                  className="formulario__input"
                  value={libroSeleccionado?.fechaPublicacion || ""}
                />
              </div>
            </div>
            <div className="hmno" id="revista_Tema">
              <label className="formulario__label">Tema: </label>
              <div className="formulario_revista-input">
                <input
                  type="text"
                  className="formulario__input"
                  value={libroSeleccionado?.tema || ""}
                />
              </div>
            </div>
            <div className="hmno" id="revista_titulo">
              <label className="formulario__label">Titulo: </label>
              <div className="formulario_revista-input">
                <input
                  type="text"
                  className="formulario__input"
                  value={libroSeleccionado?.titulo || ""}
                />
              </div>
            </div>
            <div className="hmno" id="revista_autor">
              <label className="formulario__label">Autor: </label>
              <div className="formulario_revista-input">
                <input
                  type="text"
                  className="formulario__input"
                  value={libroSeleccionado?.autor || ""}
                />
              </div>
            </div>
            <div className="botones">
              <button
                type="submit"
                className="formulario__btn1"
                onClick={closeModal1}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="formulario__btn2"
                //onClick={openModal2(libroSeleccionado)}
                onClick={() => openModal2(libroSeleccionado)}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalVisible2 && (
        <div className="modal">
          <div className="formularioRevista" id="formularioRevista">
            <div className="formulario_revista" id="revista_fecha">
              <label className="formulario__label">Fecha Inicio: </label>
              <div className="formulario_revista-input">
                <input
                  type="date"
                  className="formulario__input"
                  value={fechaReservacion}
                  onChange={handleFechaReservacionChange}
                />
              </div>
            </div>
            <div className="formulario_revista" id="revista_fecha">
              <label className="formulario__label">Fecha Entrega: </label>
              <div className="formulario_revista-input">
                <input
                  type="date"
                  className="formulario__input"
                  value={fechaEntrega}
                  onChange={handleFechaEntregaChange}
                />
              </div>
            </div>

            <div className="botones">
              <button
                type="submit"
                className="formulario__btn1"
                onClick={closeModal2}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="formulario__btn2"
                onClick={handleReservar}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default BuscadorComponent;
