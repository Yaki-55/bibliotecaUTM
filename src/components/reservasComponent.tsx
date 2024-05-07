import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient';
import '../css/reserva.css';

const ReservasComponent: React.FC = () => {
    const [reservas, setReservas] = useState<any[]>([]);

    useEffect(() => {
        const fetchReservas = async () => {
            const query = '*[_type == "reserva"]{..., "tituloData": titulo->}';
            const reservasData = await client.fetch(query);
            setReservas(reservasData);
        };
        fetchReservas();
    }, []);



    const handleDeleteReserva = async (reservaId: string) => {
        try {
            await client.delete(reservaId);
            setReservas(reservas.filter(reserva => reserva._id !== reservaId));
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };



    return (
        <div className="reservas-container">
            <h1>Gestión de Préstamos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Nombre del Alumno</th>
                        <th>Fecha de Reservación</th>
                        <th>Fecha de Devolución</th>
                        <th>Borrar Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva._id}>
                            <td>{reserva.tituloData?.titulo}</td>
                            <td>{reserva.nombreAlumno}</td>
                            <td>{reserva.fechaInicio}</td>
                            <td>{reserva.fechaFin}</td>
                            <td>
                                <button onClick={() => handleDeleteReserva(reserva._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/home" className="salir-reservas">Salir</a>
           
        </div>
    );
};

export default ReservasComponent;
