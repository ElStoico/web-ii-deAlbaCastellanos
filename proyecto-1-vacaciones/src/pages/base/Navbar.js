import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Rick and Morty</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => navigate('/')}>Inicio</button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => navigate('/static')}>Estática</button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => navigate('/character-search')}>Búsqueda de Personajes</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 