import React, { useState } from 'react';
import Navbar from './base/Navbar';
import ChapterList from '../components/ChapterList';
import { useChapters } from '../context/ChapterContext';
import '../style/Home.css';

const Home = () => {
  const { state: { chapters, loading, error } } = useChapters();
  const [likedChapters, setLikedChapters] = useState(new Set());
  const [dislikedChapters, setDislikedChapters] = useState(new Set());

  const handleLikeClick = (chapterId) => {
    setLikedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
        // Si estaba en dislikes, lo quitamos
        setDislikedChapters(prev => {
          const newDislikes = new Set(prev);
          newDislikes.delete(chapterId);
          return newDislikes;
        });
      }
      return newSet;
    });
  };

  const handleDislikeClick = (chapterId) => {
    setDislikedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
        // Si estaba en likes, lo quitamos
        setLikedChapters(prev => {
          const newLikes = new Set(prev);
          newLikes.delete(chapterId);
          return newLikes;
        });
      }
      return newSet;
    });
  };

  const handleDetailsClick = (chapterId) => {
    // Aquí implementaremos la navegación a los detalles del capítulo
    console.log('Ver detalles del capítulo:', chapterId);
  };

  if (loading) return <div className="loading">Cargando capítulos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <h1>Capítulos de Rick and Morty</h1>
        <ChapterList
          chapters={chapters}
          onLikeClick={handleLikeClick}
          onDislikeClick={handleDislikeClick}
          onDetailsClick={handleDetailsClick}
        />
      </main>
    </div>
  );
};

export default Home;
