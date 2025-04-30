import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { 
  getTopCharactersInEpisode,
  getCachedEpisode,
  setCachedEpisode,
  getCachedCharacter,
  setCachedCharacter
} from '../functions/storage';
import Navbar from './base/Navbar';
import '../style/component/chapterDetails.css';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 segundos
const TIMEOUT = 10000; // 10 segundos

const ChapterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        console.log(`Reintentando... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  const fetchChapterDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener del caché primero
      const cachedChapter = getCachedEpisode(id);
      if (cachedChapter) {
        setChapter(cachedChapter);
      } else {
        const data = await fetchWithRetry(`https://rickandmortyapi.com/api/episode/${id}`);
        setChapter(data);
        setCachedEpisode(id, data);
      }

      // Obtener detalles de los personajes
      const characterPromises = chapter.characters.map(async url => {
        const characterId = url.split('/').pop();
        const cachedCharacter = getCachedCharacter(characterId);
        if (cachedCharacter) {
          return cachedCharacter;
        }
        const characterData = await fetchWithRetry(url);
        setCachedCharacter(characterId, characterData);
        return characterData;
      });

      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);

      // Seleccionar primeros 2 y últimos 2 personajes
      const firstTwo = characterData.slice(0, 2);
      const lastTwo = characterData.slice(-2);
      setEpisodeCharacters([...firstTwo, ...lastTwo]);

      // Obtener personajes más populares
      const characterIds = characterData.map(char => char.id);
      const topCharacterIds = getTopCharactersInEpisode(characterIds, id);
      const topChars = characterData.filter(char => topCharacterIds.includes(char.id));
      setTopCharacters(topChars);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.name === 'AbortError') {
        setError('La solicitud tardó demasiado en completarse. Por favor, verifica tu conexión a internet.');
      } else {
        setError('No se pudo cargar la información del capítulo. Por favor, intente nuevamente más tarde.');
      }
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    fetchChapterDetails();
  }, [id, navigate, retryCount]);

  const handleCharacterLike = () => {
    const characterIds = characters.map(char => char.id);
    const topCharacterIds = getTopCharactersInEpisode(characterIds, id);
    const topChars = characters.filter(char => topCharacterIds.includes(char.id));
    setTopCharacters(topChars);
  };

  if (loading) {
    return (
      <div className="chapter-details">
        <div className="loading">
          Cargando detalles del capítulo...
          {retryCount > 0 && <div className="retry-info">Intento {retryCount} de {MAX_RETRIES}</div>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chapter-details">
        <div className="error">
          {error}
          {retryCount < MAX_RETRIES && (
            <button 
              className="retry-button"
              onClick={() => setRetryCount(prev => prev + 1)}
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="chapter-details">
        <div className="error">No se encontró el capítulo</div>
      </div>
    );
  }

  return (
    <div className="chapter-details">
      <Navbar />
      <div className="chapter-details-content">
        <div className="chapter-details-container">
          <h1 className="chapter-details-title">{chapter.name}</h1>
          <div className="chapter-details-info">
            <p className="episode-code">Episodio: {chapter.episode}</p>
            <p className="air-date">Fecha de emisión: {chapter.air_date}</p>
          </div>
        </div>

        {topCharacters.length > 0 && (
          <div className="characters-section">
            <h2 className="characters-title">Personajes Favoritos</h2>
            <div className="characters-grid">
              {topCharacters.map(character => (
                <CharacterCard
                  key={character.id}
                  characterId={character.id}
                  episodeId={id}
                  characterName={character.name}
                  imageUrl={character.image}
                  onLikeClick={handleCharacterLike}
                />
              ))}
            </div>
          </div>
        )}

        <div className="characters-section">
          <h2 className="characters-title">Personajes del Capítulo</h2>
          <div className="characters-grid">
            {episodeCharacters.map(character => (
              <CharacterCard
                key={character.id}
                characterId={character.id}
                episodeId={id}
                characterName={character.name}
                imageUrl={character.image}
                onLikeClick={handleCharacterLike}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetails; 