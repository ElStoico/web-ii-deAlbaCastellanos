import React, { useState, useEffect } from 'react';
import '../style/component/characterCard.css';
import likeIcon from '../images/like.png';
import { getCharacterLikesInEpisode, setCharacterLikesInEpisode } from '../functions/storage';

const CharacterCard = ({ characterId, episodeId, characterName, imageUrl, onDetailsClick, onLikeClick, disableLike = false }) => {
  const [likes, setLikes] = useState(0);
  const [showLikeCount, setShowLikeCount] = useState(false);

  // Cargar contador guardado al montar el componente
  useEffect(() => {
    if (characterId && episodeId) {
      const savedLikes = getCharacterLikesInEpisode(characterId, episodeId);
      setLikes(savedLikes);
      setShowLikeCount(savedLikes > 0);
    }
  }, [characterId, episodeId]);

  const handleLikeClick = () => {
    if (!disableLike && characterId && episodeId) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setShowLikeCount(true);
      setCharacterLikesInEpisode(characterId, episodeId, newLikes);
      onLikeClick();
    }
  };

  return (
    <div className="character-card">
      <div className="character-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="character-details-btn" onClick={onDetailsClick}>
        <span className="character-details-text">Más detalles</span>
      </div>
      <div className={`character-like-btn ${disableLike ? 'disabled' : ''}`} onClick={handleLikeClick}>
        <span className="character-like-text">Like</span>
        {showLikeCount ? (
          <span className="count-badge">{likes}</span>
        ) : (
          <img src={likeIcon} alt="Like" className="character-like-icon" />
        )}
      </div>
      <span className="character-name">{characterName}</span>
    </div>
  );
};

export default CharacterCard; 