import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { getTopCharactersInEpisode, getCharacterLikesInEpisode } from '../functions/storage';
import Navbar from './base/Navbar';
import '../style/component/chapterDetails.css';

const ChapterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      if (!id) {
        setError('ID del capítulo no proporcionado');
        setLoading(false);
        return;
      }

      try {
        // Obtener detalles del capítulo
        const chapterResponse = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        if (!chapterResponse.ok) {
          throw new Error(`Error al cargar el capítulo: ${chapterResponse.status}`);
        }
        const chapterData = await chapterResponse.json();
        setChapter(chapterData);

        // Obtener personajes solo si hay personajes disponibles
        if (chapterData.characters && chapterData.characters.length > 0) {
          const characterUrls = chapterData.characters;
          const characterIds = characterUrls.map(url => url.split('/').pop());
          
          // Seleccionar los 2 primeros y 2 últimos personajes para la sección de episodio
          const selectedEpisodeIds = [
            ...characterIds.slice(0, 2),
            ...characterIds.slice(-2)
          ];

          // Obtener los IDs de los personajes más populares
          const topCharacterIds = getTopCharactersInEpisode(characterIds, id);

          // Combinar los IDs únicos para hacer una sola llamada a la API
          const uniqueIds = [...new Set([...selectedEpisodeIds, ...topCharacterIds])];

          if (uniqueIds.length > 0) {
            const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/${uniqueIds.join(',')}`);
            if (!charactersResponse.ok) {
              throw new Error(`Error al cargar los personajes: ${charactersResponse.status}`);
            }
            const charactersData = await charactersResponse.json();
            const charactersArray = Array.isArray(charactersData) ? charactersData : [charactersData];

            // Guardar todos los personajes en el estado
            setAllCharacters(charactersArray);

            // Separar los personajes en sus respectivas secciones
            setEpisodeCharacters(
              charactersArray.filter(char => selectedEpisodeIds.includes(char.id.toString()))
            );
            setTopCharacters(
              charactersArray.filter(char => topCharacterIds.includes(char.id.toString()))
            );
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [id, navigate]);

  // Efecto para actualizar los personajes favoritos cuando cambia likeCount
  useEffect(() => {
    if (chapter?.characters) {
      const characterIds = chapter.characters.map(url => url.split('/').pop());
      const newTopCharacterIds = getTopCharactersInEpisode(characterIds, id);
      
      // Actualizar la lista de personajes top usando allCharacters como fuente de datos
      const newTopCharacters = allCharacters.filter(char => 
        newTopCharacterIds.includes(char.id.toString())
      );
      
      setTopCharacters(newTopCharacters);
    }
  }, [likeCount, chapter, id, allCharacters]);

  const handleCharacterLike = (characterId) => {
    // Incrementar el contador para forzar la actualización
    setLikeCount(prev => prev + 1);
  };

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!chapter) return <div className="error">No se encontró el capítulo</div>;

  return (
    <div className="chapter-details-container">
      <Navbar />
      <h1 className="chapter-details-title">{chapter.name}</h1>
      <div className="chapter-details-info">
        <p className="episode-code">Código: {chapter.episode}</p>
        <p className="air-date">Fecha de estreno: {chapter.air_date}</p>
      </div>

      {topCharacters.length > 0 && (
        <div className="characters-section">
          <h2 className="characters-title">Personajes Favoritos</h2>
          <div className="characters-grid">
            {topCharacters.map(character => (
              <CharacterCard
                key={`top-${character.id}-${likeCount}`}
                characterId={character.id}
                episodeId={id}
                characterName={character.name}
                imageUrl={character.image}
                onDetailsClick={() => {}}
                onLikeClick={() => {}}
                disableLike={true}
              />
            ))}
          </div>
        </div>
      )}

      {episodeCharacters.length > 0 && (
        <div className="characters-section">
          <h2 className="characters-title">Personajes del Capítulo</h2>
          <div className="characters-grid">
            {episodeCharacters.map(character => (
              <CharacterCard
                key={`episode-${character.id}-${likeCount}`}
                characterId={character.id}
                episodeId={id}
                characterName={character.name}
                imageUrl={character.image}
                onDetailsClick={() => {}}
                onLikeClick={() => handleCharacterLike(character.id)}
                disableLike={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDetails; 