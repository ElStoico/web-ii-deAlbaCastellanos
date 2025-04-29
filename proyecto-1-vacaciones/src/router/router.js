import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ChapterDetails from '../pages/ChapterDetails';
import CharacterSearch from '../pages/CharacterSearch';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chapter/:id" element={<ChapterDetails />} />
      <Route path="/character-search" element={<CharacterSearch />} />
    </Routes>
  );
};

export default AppRouter; 