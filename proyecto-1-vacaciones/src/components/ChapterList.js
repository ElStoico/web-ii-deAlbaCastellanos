import React from 'react';
import ChapterCard from './ChapterCard';
import '../style/component/chapterList.css';

const ChapterList = ({ chapters, onLikeClick, onDislikeClick, onDetailsClick }) => {
  return (
    <div className="chapter-list">
      {chapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          onLikeClick={() => onLikeClick(chapter.id)}
          onDislikeClick={() => onDislikeClick(chapter.id)}
          onDetailsClick={() => onDetailsClick(chapter.id)}
        />
      ))}
    </div>
  );
};

export default ChapterList; 