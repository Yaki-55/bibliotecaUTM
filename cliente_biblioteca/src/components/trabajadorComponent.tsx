import React, { useEffect, useState } from "react";
import client from "../utils/sanityClient";
import "../css/trabajador.css";
import ModalReserva from "./modalReserva";

const TrabajadorComponent: React.FC = () => {
  const [libros, setLibros] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("titulo");
  const [documentType, setDocumentType] = useState(""); // Nuevo estado para el tipo de documento
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const openModal2 = () => setIsModalOpen(true);
  // const closeModal2 = () => setIsModalOpen(false);  

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
    <div className="results-table-container">
        <table className="results-table">
            <thead>
                <tr>
                    <th className="tabla_letra">Titulo</th>
                    <th className="tabla_letra">Autor</th>
                    <th className="tabla_letra">Tema</th>
                    <th className="tabla_letra">Más</th>
                </tr>
            </thead>
            <tbody>
                {libros.map((libro, index) => (
                    <tr key={index}>
                        <td >{libro.titulo}</td>
                        <td>{libro.autor}</td>
                        <td>{libro.tema}</td>
                        <td>{libro.codigo}</td>

                    </tr>
                ))}
            </tbody>
        </table>
        <ModalReserva onClose={closeModal} isOpen={isModalOpen} />
    </div>
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
        <h1 className="titulo">Hemeroteca/Biblioteca</h1>
      </div>
      <br></br>

      <form onSubmit={handleSearch}>
        {/* Filtro por Tipo */}


        <div className="buscador-container-tipos">
          <label>
            <h4 className="filtro_letra"> Tipo:   </h4>
            <input
              type="radio"
              name="documentType"
              value="libro"
              checked={documentType === "libro"}
              onChange={handleDocumentTypeChange}
            />
            <h4  className="filtro_letra">Libro</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="revista"
              checked={documentType === "revista"}
              onChange={handleDocumentTypeChange}
            />
            <h4  className="filtro_letra">Revista</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="tesis"
              checked={documentType === "tesis"}
              onChange={handleDocumentTypeChange}
            />
            <h4  className="filtro_letra">Tesis</h4>
          </label>
          <label>
            <input
              type="radio"
              name="documentType"
              value="" // Representa la opción "Todos"
              checked={documentType === ""}
              onChange={handleDocumentTypeChange}
            />
            <h4  className="filtro_letra">Todos</h4>
          </label>
     
        </div>
        {/* Poner el modal*/}
        <div className="inputPersonalizado">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Buscar..."
            autoComplete="off"
            className="search-input" // Agrega una clase al campo de entrada
          />
        </div>
        {/* Filtro por Título, Autor, Tema */}
        <div className="oraoraora">
          <label>
            <input
              type="radio"
              name="searchType"
              value="titulo"
              checked={searchType === "titulo"}
              onChange={handleSearchTypeChange}
            />
            Título
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="autor"
              checked={searchType === "autor"}
              onChange={handleSearchTypeChange}
            />
            Autor
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="tema"
              checked={searchType === "tema"}
              onChange={handleSearchTypeChange}
            />
            Tema
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="isbn"
              checked={searchType === "isbn"}
              onChange={handleSearchTypeChange}
            />
            ISBN
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="issn"
              checked={searchType === "issn"}
              onChange={handleSearchTypeChange}
            />
            ISSN
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="codigo"
              checked={searchType === "codigo"}
              onChange={handleSearchTypeChange}
            />
            Código
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value=""
              checked={searchType === ""}
              onChange={handleSearchTypeChange}
            />
            Todo
          </label>
        </div>
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
    </div>
  );
};

export default TrabajadorComponent;
