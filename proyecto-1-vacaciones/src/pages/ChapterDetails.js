import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import '../style/component/chapterDetails.css';

const ChapterDetails = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        // Obtener detalles del capítulo
        const chapterResponse = await fetch(`https://rickandmortyapi.com/api/episode/${chapterId}`);
        const chapterData = await chapterResponse.json();
        setChapter(chapterData);

        // Obtener personajes aleatorios
        const characterIds = chapterData.characters
          .map(url => url.split('/').pop())
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(',')}`);
        const charactersData = await charactersResponse.json();
        setCharacters(Array.isArray(charactersData) ? charactersData : [charactersData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [chapterId]);

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (!chapter) return <div className="error">No se encontró el capítulo</div>;

  return (
    <div className="chapter-details">
      <h1 className="chapter-title">{chapter.name}</h1>
      <div className="chapter-info">
        <p className="episode-code">Código: {chapter.episode}</p>
        <p className="air-date">Fecha de estreno: {chapter.air_date}</p>
      </div>
      <h2 className="characters-title">Personajes Destacados</h2>
      <div className="characters-grid">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            characterName={character.name}
            imageUrl={character.image}
            onDetailsClick={() => {}}
            onLikeClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterDetails; 