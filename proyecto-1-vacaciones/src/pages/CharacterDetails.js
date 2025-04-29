import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './base/Navbar';
import '../style/component/characterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!id) {
        setError('ID del personaje no proporcionado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error(`Error al cargar el personaje: ${response.status}`);
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) return <div className="loading">Cargando detalles del personaje...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!character) return <div className="error">No se encontró el personaje</div>;

  return (
    <div className="character-details-container">
      <Navbar />
      <main className="character-details-main">
        <h1 className="character-name">{character.name}</h1>
        
        <div className="character-info-container">
          <div className="character-image-container">
            <img src={character.image} alt={character.name} className="character-image" />
          </div>
          
          <div className="character-details">
            <div className="info-section">
              <h2>Información General</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Estado:</span>
                  <span className={`info-value status-${character.status.toLowerCase()}`}>
                    {character.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Especie:</span>
                  <span className="info-value">{character.species}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Género:</span>
                  <span className="info-value">{character.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Origen:</span>
                  <span className="info-value">{character.origin.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ubicación:</span>
                  <span className="info-value">{character.location.name}</span>
                </div>
                {character.type && (
                  <div className="info-item">
                    <span className="info-label">Tipo:</span>
                    <span className="info-value">{character.type}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="episodes-section">
              <h2>Episodios</h2>
              <div className="episodes-list">
                {character.episode.map((episodeUrl, index) => {
                  const episodeId = episodeUrl.split('/').pop();
                  return (
                    <div key={episodeId} className="episode-item">
                      <span className="episode-number">Episodio {episodeId}</span>
                      <button 
                        className="episode-link"
                        onClick={() => navigate(`/chapter/${episodeId}`)}
                      >
                        Ver capítulo
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetails; 