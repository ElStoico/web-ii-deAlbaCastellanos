import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/component/chapterCard.css';
import likeIcon from '../images/like.png';
import dislikeIcon from '../images/dislike.png';

const ChapterCard = ({ chapter, onLikeClick, onDislikeClick }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/chapter/${chapter.id}`);
  };

  return (
    <div className="chapter-card">
      <span className="chapter-title">{chapter.name}</span>
      
      <div className="chapter-info">
        <span className="chapter-episode">Episodio: {chapter.episode}</span>
        <span className="chapter-airdate">Fecha de emisión: {chapter.air_date}</span>
      </div>
      
      <div className="buttons-container">
        <div className="like-button" onClick={() => onLikeClick(chapter.id)}>
          <span className="like-text">Like</span>
          <img src={likeIcon} alt="Like" className="like-icon" />
        </div>
        
        <div className="dislike-button" onClick={() => onDislikeClick(chapter.id)}>
          <span className="dislike-text">Dislike</span>
          <img src={dislikeIcon} alt="Dislike" className="dislike-icon" />
        </div>
      </div>
      
      <div className="details-button" onClick={handleDetailsClick}>
        <span className="details-text">Más detalles</span>
      </div>
    </div>
  );
};

export default ChapterCard; 