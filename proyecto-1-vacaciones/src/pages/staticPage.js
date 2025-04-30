import React from 'react';
import placeholderImage from '../images/placeholder.png';
import static1Image from '../images/static1.png';
import Navbar from './base/Navbar';
import Footer from './base/Footer';
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
      <p className="description">
        Rick y Morty (en inglés: Rick and Morty) es una serie de televisión estadounidense de animación para adultos creada por Justin Roiland y Dan Harmon en 2013 para Adult Swim, también se emitió en Cartoon Network. La serie sigue las desventuras de un científico, Rick Sánchez, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los Viajes espaciales e intergalácticos. Dan Harmon, el cocreador de la serie y Justin Roiland son los encargados de las voces principales de Morty y Rick, la serie también incluye las voces de Chris Parnell, Spencer Grammer y Sarah Chalke.
      </p>
      <img src={static1Image} alt="Static 1" className="static-image" />
      <p className="description">
        Rick Sánchez es el estereotipo del «científico loco». Es un genio y buen tipo, pero es irresponsable, poco arreglado, alcohólico, egoísta, depresivo, sarcástico y con poca cordura. Rick por no poder pagar la renta de su antigua casa termina mudándose a la casa de su hija Beth y en ese momento se encuentra con su nieto Morty; un joven de 14 años sin expresión, tímido y no muy listo. Al juntarse con su nieto, Rick y Morty viven una variedad de aventuras a lo largo de universos paralelos. Y es mediante tantas vivencias y reflexiones que Rick busca que su nieto Morty no acabe como su padre, Jerry, un hombre muy poco exitoso que a pesar de tener buenas intenciones resulta ser bastante inútil en muchas ocasiones y depende mucho de su esposa, Beth.

        A pesar de estar muy apegados, Rick y su nieto experimentan momentos en los que Summer Smith, hermana de Morty, se une en ocasiones a las pintorescas aventuras provocadas por Rick.
      </p>
      <Footer />
    </div>
  );
};

export default StaticPage;
