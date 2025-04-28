import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ChapterDetails from '../pages/ChapterDetails';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chapter/:id" element={<ChapterDetails />} />
    </Routes>
  );
};

export default AppRouter; 