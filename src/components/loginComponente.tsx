import React, { useState } from 'react';
import client from '../utils/sanityClient';
import '../css/login.css';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alumnoNombre, setAlumnoNombre] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const query = `*[_type == "usuario" && correo == "${email}" && contrasena == "${password}"]`;
      const users = await client.fetch(query);

      if (users.length === 0) {
        setErrorMessage('Usuario o contraseña incorrectos');
        return;
      }

      const user = users[0];

      if (user.tipo_usuario === 'administrador') {
        // Redirigir al usuario administrador a la página de inicio
        window.location.href = `${window.location.origin}/home`;
      } else if (user.tipo_usuario === 'alumno') {
        const alumno = user.nombre;
        console.log(alumno);
        setAlumnoNombre(alumno); // Guarda el nombre del alumno en el estado
        localStorage.setItem('alumnoNombre', alumno);

        // Retrasa la redirección en 5 segundos para permitir que se muestre el nombre del alumno
        setTimeout(() => {
          window.location.href = `${window.location.origin}/buscador`;
        }, 5000);
      } else if (user.tipo_usuario === 'trabajador') {
        // Redirigir al usuario trabajador a otra página de inicio o realizar otra acción
        // Por ejemplo: window.location.href = '/otra-ruta';
        window.location.href = `${window.location.origin}/trabajador`;
        console.log('Usuario trabajador autenticado');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Muestra el nombre del alumno si está disponible */}
      {alumnoNombre && <div className="alumno-nombre">Bienvenido, {alumnoNombre}</div>}
    </div>
  );
};

export default LoginComponent;
