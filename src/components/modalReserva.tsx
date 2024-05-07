import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/modalReserva.css';
import CrearQR from './crearQR';
interface ModalReservaProps {
    onClose: () => void;
    isOpen: boolean;
}
  
const ModalReserva: React.FC<ModalReservaProps> = ({ onClose, isOpen }) => {
    const [startDate, setStartDate] = React.useState(new Date()); // Añadir estado para la fecha seleccionada
    const [urlReserva, setUrlReserva] = React.useState(''); // Estado para la URL de la reserva
    const [showQR, setShowQR] = React.useState(false); // Estado para mostrar el QR

    
       // Esta es la función que maneja el cierre del modal de reserva y el QR
    

    const confirmarReserva = () => {
        // Aquí generas la URL de la reserva. Esto es solo un ejemplo.
        const nuevaUrlReserva = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`;
        setUrlReserva(nuevaUrlReserva);

        // Mostrar el QR después de confirmar la reserva
        setShowQR(true);
    };
    if (!isOpen) return null;

    return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Mes actual:Abril 2024</h2>
          {showQR && (
            <button onClick={onClose} className="close-button">
              X {/* O el icono que prefieras */}
            </button>
          )}
        </div>
        {showQR ? (
          // Si showQR es verdadero, muestra el componente QR
          <CrearQR url={urlReserva} onClose={onClose} />
        ) : (
          // De lo contrario, muestra el contenido del modal para hacer la reserva
          <div className="modal-content">
            <div className="calendar-container">
              <DatePicker
                inline
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
              <div className="calendar-legend">
                <p>Elige fecha disponible</p>
                <div><span className="dot occupied"></span>Ocupado</div>
                <div><span className="dot delivery"></span>Día de entrega</div>
                <div><span className="dot return"></span>Devolución</div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={onClose} className="cancel-button">Cancelar</button>
              <button onClick={confirmarReserva} className="confirm-button">Aceptar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default ModalReserva;
