import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { RiFileCopyLine, RiDownload2Line, RiCloseLine } from 'react-icons/ri'; // Importar los iconos de react-icons
import '../css/qr.css';

interface CrearQRProps {
  url: string; // La URL de la reserva a codificar en el QR
  onClose: () => void; // Función para cerrar el modal

}

const CrearQR: React.FC<CrearQRProps> = ({ url, onClose }) => {
  const [value, setValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState('#000000'); // Color por defecto: negro

  const handleClick = () => {
    const url = 'https://tinyurl.com/api-create.php';   //Usar esta pagina como api para crear QR

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(value)}`
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Failed to shorten URL');
      })
      .then(data => {
        setShortenedUrl(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
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
      console.error('Canvas element not found.');
    }
  };

  return (
    <div className="qr-modal-overlay"> {/* El overlay que cubre toda la pantalla */}
      <div className="qr-modal"> {/* El contenedor del modal */}
        <div className="qr-modal-header">

        </div>
        <div className="qr-modal-content">
          <h1> <span style={{ color: 'gold' }}>Reserva generada</span></h1>
          {/* Aquí se muestra el código QR */}
          <QRCode value={url} fgColor={qrColor} size={256} />
          {/* Mensaje indicando que el enlace se ha copiado */}
          {copied && <span style={{ color: 'green' }}>Enlace copiado!</span>}
          <div className="qr-modal-actions">
            {/* Botón para copiar el enlace del QR */}
            <CopyToClipboard text={url} onCopy={handleCopy}>
              <button className="copy-button">
                <RiFileCopyLine /> Copiar
              </button>
            </CopyToClipboard>
            {/* Botón para descargar la imagen del QR */}
            <button className="download-button" onClick={handleDownload}>
              <RiDownload2Line /> Descargar QR
            </button>
            <button onClick={onClose} className="close-button">
              <RiCloseLine /> Salir{/* El icono de cierre */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CrearQR;
