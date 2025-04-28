import React from 'react';
import '../style/component/characterCard.css';
import likeIcon from '../images/like.png';
import dislikeIcon from '../images/dislike.png';

const CharacterCard = ({ characterName, imageUrl, onDetailsClick, onLikeClick }) => {
  return (
    <div className="character-card">
      <div className="character-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="character-details-btn" onClick={onDetailsClick}>
        <span className="character-details-text">Más detalles</span>
      </div>
      <div className="character-like-btn" onClick={onLikeClick}>
        <span className="character-like-text">Like</span>
        <img src={likeIcon} alt="Like" className="character-like-icon" />
      </div>
      <span className="character-name">{characterName}</span>
    </div>
  );
};

export default CharacterCard; 