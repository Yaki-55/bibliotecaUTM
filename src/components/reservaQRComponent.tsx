import React, { useEffect, useState } from 'react';
import client from '../utils/sanityClient'; 
import '../css/reservaQR.css';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { RiFileCopyLine, RiDownload2Line } from 'react-icons/ri'; // Importar iconos para las acciones
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaSignOutAlt } from "react-icons/fa"; 
import { Link } from 'react-router-dom';

type ReservaType = {
    fechaFin: string;
    fechaInicio: string;
    nombreAlumno: string; // Ajusta esta línea
    titulo: {
        _ref: string; // Ajusta esta línea para indicar que es una referencia
        _type: string;
    };
};
const ReservaQRComponent: React.FC = () => {
  const {id} = useParams();
  const [reserva, setReserva] = useState<ReservaType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false); // Asegúrate de incluir esta línea


  useEffect(() => {
    client
        .fetch(`*[_type == "reserva" && _id == $id]`, { id })
        .then((data) => {
            setReserva(data[0]);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
  }, [id]);
    const handleCopy = () => {
        setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Restablece el estado de 'copied' después de 1 segundo
    };

    const handleDownload = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const qrImageUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = qrImageUrl;
        downloadLink.download = 'qr_code.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error('No se ha encontrado.');
      }
    };
    if (error) {
        return <div>Error al cargar la reserva: {error}</div>;
    }
    if (!reserva) {
        return <div>No se encontró la reserva</div>;
    }
    if (loading) {
        return <div>Cargando...</div>;
    }
    const reservationInfo = `Nombre: ${reserva.nombreAlumno}, Título ID: ${reserva.titulo._ref}, Fecha de inicio: ${reserva.fechaInicio}, Fecha de fin: ${reserva.fechaFin}`;
    
    
    return (
        <div className="reserva-container">
          <h1 className="reserva-title">Reserva</h1>
          <div className="reserva-details">
            <p><strong>Nombre del Alumno:</strong> {reserva.nombreAlumno}</p>
            <p><strong>Título ID:</strong> {reserva.titulo._ref}</p>
            <p><strong>Fecha de inicio:</strong> {reserva.fechaInicio}</p>
            <p><strong>Fecha de fin:</strong> {reserva.fechaFin}</p>
          </div>
      
          {/* Visualización del QR directamente en el componente */}
          <div className="qr-container">
            <p className="qr-label">Este es el QR de tu reserva</p>
            <QRCode value={reservationInfo} size={256} fgColor="#000000" />
            {copied && <p className="copied-message">Enlace copiado!</p>}
          </div>
      
          <div className="button-container">
            {/* Botón para copiar la información del QR */}
            <CopyToClipboard text={reservationInfo} onCopy={handleCopy}>
              <button className="copy-button">
                <RiFileCopyLine /> Copiar
              </button>
            </CopyToClipboard>
            {/* Botón para descargar la imagen del QR */}
            <button className="download-button" onClick={handleDownload}>
              <RiDownload2Line /> Descargar QR
            </button>
            <Link to="/buscador" className="home-link"><FaSignOutAlt /> Cerrar sesión</Link>
          </div>
        </div>
      );
      
    
};
export default ReservaQRComponent;
