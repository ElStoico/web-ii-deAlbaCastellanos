import React from 'react';
import '../../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Rick and Morty</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <button className="navbar-link">Index</button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link">Estática</button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link">Búsqueda de Personaje</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 