import React from 'react';
import '../../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Acerca de Rick y Morty</h3>
          <p>Una serie de animación para adultos creada por Justin Roiland y Dan Harmon.</p>
        </div>
        <div className="footer-section">
          <h3>Información de Contacto</h3>
          <p>Email: info@rickandmorty.com</p>
          <p>Redes Sociales: @RickandMorty</p>
        </div>
        <div className="footer-section">
          <h3>Derechos de Autor</h3>
          <p>© 2024 Rick y Morty. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
