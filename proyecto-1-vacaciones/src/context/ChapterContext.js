import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ChapterContext = createContext();

const initialState = {
  chapters: [],
  loading: true,
  error: null
};

const chapterReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, chapters: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ChapterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chapterReducer, initialState);

  useEffect(() => {
    const fetchChapters = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch('https://rickandmortyapi.com/api/episode');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.results });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchChapters();
  }, []);

  return (
    <ChapterContext.Provider value={{ state, dispatch }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapters = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error('useChapters must be used within a ChapterProvider');
  }
  return context;
}; 