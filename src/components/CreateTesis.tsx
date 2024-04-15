import React, { useEffect, useState } from 'react';
import client from '../client';
import '../index.css';

//function CreateTesis(){
const CreateTesis: React.FC = () => {
    const [tesis, setTesis] = useState<any[]>([]); 
    const [newTesisTitle, setNewTesisTitle] = useState<string>(''); // Estado para el título de un nuevo libro
    const [newTesisAuthor, setNewTesisAuthor] = useState<string>(''); // Estado para el autor de un nuevo libro
    const [newFechaPresentacion, setNewFechaPresentacion] = useState<Date>(new Date());// Estado para el autor de un nuevo libro
    const [newInstituto, setNewInstituto] = useState<string>(''); // Estado para el autor de un nuevo libro
    const [newNumPagina, setNewNumPagina] = useState<number>(0);
    const [newCodigo, setNewCodigo] = useState<string>(''); 
    const [newDonado, setNewDonado] = useState<boolean>(false);
    

    useEffect(() => {
      fetchTesis();
    }, []);

    const fetchTesis = async () => {
      try {
        // Realiza una consulta a Sanity para obtener los tesis
        // const query = *[_type == "tesis"]; // Filtra los documentos por el tipo de documento "tesis"
        const query = `*[_type == "tesis"]`;
        const fetchedTesis = await client.fetch(query);

        // Actualiza el estado con los tesis obtenidos de Sanity
        setTesis(fetchedTesis);
      } catch (error) {
        console.error('Error al obtener las tesis de Sanity:', error);
      }
    };    

    const handleAddTesis = async () => {
      try {
        // Crea un nuevo documento en Sanity con los datos del nuevo libro
        const newTesis = {
          _type: 'tesis',
          title: newTesisTitle,
          author: newTesisAuthor,
          date: newFechaPresentacion,
          school: newInstituto,
          code: newCodigo,
          // Agrega más campos según sea necesario
        };
        
        // Envía la solicitud para crear una nueva tesis
        await client.create(newTesis);

        // Actualiza la lista de tesis después de agregar la tesis
        setTesis(prevTesis => [...prevTesis, newTesis]);

        // Limpia los campos de entrada después de agregar la tesis
        setNewTesisTitle('');
        setNewTesisAuthor('');
        //setNewFechaPresentacion(null);
        setNewFechaPresentacion(new Date()); 
        setNewInstituto('');
        setNewCodigo('');
      } catch (error) {
        console.error('Error al agregar uan nueva tesis:', error);
      }
    };

    const handleDeleteTesis = async (tesisId: string) => {
      try {
        // Elimina la tesis localmente
        setTesis(prevTesis => prevTesis.filter(tesis => tesis._id !== tesisId));

        // Elimina la tesis de la base de datos
        await client.delete(tesisId);
      } catch (error) {
        console.error('Error al eliminar la tesis: ', error);
      }
    };

    return (
      <div className="container"> {/* Agrega la clase "container" para centrar */}
        <div>
          {/* Formulario para agregar una nueva revista */}
          <div>
            <h3>Agregar nueva revista</h3>
            <input type="text" value={newTesisTitle} onChange={(e) => setNewTesisTitle(e.target.value)} placeholder="Título de la revista" />
            <input type="text" value={newTesisAuthor} onChange={(e) => setNewTesisAuthor(e.target.value)} placeholder="Autor de la revista" />
            
            <input type="date" value={newFechaPresentacion ? newFechaPresentacion.toISOString().slice(0, 10) : ''} // Handle null or undefined values
            onChange={(e) => setNewFechaPresentacion(e.target.value as unknown as Date)} // Cast to unknown to avoid strict type checking during event handling
            placeholder="Fecha de presentación" />

            <br></br>
            <input type='text' value={newInstituto} onChange={(e) => setNewInstituto (e.target.value)} placeholder='Instituto' />
            <br></br>
            <input type='number' value={newNumPagina} onChange={(e) =>  setNewNumPagina (parseInt(e.target.value))} placeholder="No. página" />
            <br></br>
            <input type='text' value={newCodigo} onChange={(e) => setNewCodigo (e.target.value)} placeholder='Código' />
            <br></br>
            <input type="checkbox" value={newDonado} onChange={(e) => setNewDonado(e.target.checked)} placeholder="Es donado?" />
            <br />
            <button onClick={handleAddTesis}>Agregar Tesis</button>
          </div>
        </div>
      </div>
    );
};
export default CreateTesis;