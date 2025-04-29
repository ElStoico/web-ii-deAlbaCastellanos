import React, { useState, useEffect } from 'react';
import '../style/component/chapterCard.css';
import likeIcon from '../images/like.png';
import dislikeIcon from '../images/dislike.png';
import placeholderImage from '../images/placeholder.png';
import { getChapterLikes, setChapterLikes, getChapterDislikes, setChapterDislikes } from '../functions/storage';

const ChapterCard = ({ chapter, onLikeClick, onDislikeClick, onDetailsClick }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showLikeCount, setShowLikeCount] = useState(false);
  const [showDislikeCount, setShowDislikeCount] = useState(false);

  // Cargar contadores guardados al montar el componente
  useEffect(() => {
    const savedLikes = getChapterLikes(chapter.id);
    const savedDislikes = getChapterDislikes(chapter.id);
    
    setLikes(savedLikes);
    setDislikes(savedDislikes);
    setShowLikeCount(savedLikes > 0);
    setShowDislikeCount(savedDislikes > 0);
  }, [chapter.id]);

  const handleLikeClick = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    setShowLikeCount(true);
    setChapterLikes(chapter.id, newLikes);
    onLikeClick(chapter.id);
  };

  const handleDislikeClick = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    setShowDislikeCount(true);
    setChapterDislikes(chapter.id, newDislikes);
    onDislikeClick(chapter.id);
  };

  return (
    <div className="chapter-card">
      <img src={placeholderImage} alt="Chapter thumbnail" className="chapter-image" />
      
      <div className="chapter-content">
        <div className="chapter-header">
          <span className="chapter-title">{chapter.name}</span>
          
          <div className="chapter-info">
            <span className="chapter-episode">Episodio: {chapter.episode}</span>
            <span className="chapter-airdate">Fecha de emisión: {chapter.air_date}</span>
          </div>
        </div>
        
        <div className="chapter-actions">
          <div className="buttons-container">
            <div className="like-button" onClick={handleLikeClick}>
              <span className="like-text">Like</span>
              {showLikeCount ? (
                <span className="count-badge">{likes}</span>
              ) : (
                <img src={likeIcon} alt="Like" className="like-icon" />
              )}
            </div>
            
            <div className="dislike-button" onClick={handleDislikeClick}>
              <span className="dislike-text">Dislike</span>
              {showDislikeCount ? (
                <span className="count-badge">{dislikes}</span>
              ) : (
                <img src={dislikeIcon} alt="Dislike" className="dislike-icon" />
              )}
            </div>
          </div>
          
          <div className="details-button" onClick={() => onDetailsClick(chapter.id)}>
            <span className="details-text">Más detalles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard; 