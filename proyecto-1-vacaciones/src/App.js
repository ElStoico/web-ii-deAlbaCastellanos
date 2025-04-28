import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/router';
import { ChapterProvider } from './context/ChapterContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ChapterProvider>
        <div className="App">
          <AppRouter />
        </div>
      </ChapterProvider>
    </BrowserRouter>
  );
}

export default App;
