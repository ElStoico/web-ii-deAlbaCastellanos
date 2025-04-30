import React from 'react';
import placeholderImage from '../images/placeholder.png';
import Navbar from './base/Navbar';
import '../style/StaticPage.css';

const StaticPage = () => {
  return (
    <div className="static-page">
      <Navbar />
      <div className="banner">
        <div className="banner-left" style={{ backgroundImage: `url(${placeholderImage})` }}></div>
        <div className="banner-right">
          <h1>Rick y Morty Season 2!</h1>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
