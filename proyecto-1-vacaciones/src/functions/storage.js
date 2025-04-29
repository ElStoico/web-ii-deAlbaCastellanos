// Prefijos para las claves de almacenamiento
const CHAPTER_LIKES_PREFIX = 'chapter_likes_';
const CHAPTER_DISLIKES_PREFIX = 'chapter_dislikes_';
const CHARACTER_LIKES_PREFIX = 'character_likes_';

// Funciones para capítulos
export const getChapterLikes = (chapterId) => {
  return parseInt(localStorage.getItem(`${CHAPTER_LIKES_PREFIX}${chapterId}`) || '0');
};

export const setChapterLikes = (chapterId, count) => {
  localStorage.setItem(`${CHAPTER_LIKES_PREFIX}${chapterId}`, count.toString());
};

export const getChapterDislikes = (chapterId) => {
  return parseInt(localStorage.getItem(`${CHAPTER_DISLIKES_PREFIX}${chapterId}`) || '0');
};

export const setChapterDislikes = (chapterId, count) => {
  localStorage.setItem(`${CHAPTER_DISLIKES_PREFIX}${chapterId}`, count.toString());
};

// Funciones para personajes en episodios específicos
export const getCharacterLikesInEpisode = (characterId, episodeId) => {
  return parseInt(localStorage.getItem(`${CHARACTER_LIKES_PREFIX}${characterId}_ep${episodeId}`) || '0');
};

export const setCharacterLikesInEpisode = (characterId, episodeId, count) => {
  localStorage.setItem(`${CHARACTER_LIKES_PREFIX}${characterId}_ep${episodeId}`, count.toString());
};

// Función para obtener los personajes más populares de un episodio
export const getTopCharactersInEpisode = (characterIds, episodeId, limit = 3) => {
  // Obtener los likes de cada personaje
  const characterLikes = characterIds.map(id => ({
    id,
    likes: getCharacterLikesInEpisode(id, episodeId)
  }));

  // Ordenar por número de likes (de mayor a menor)
  return characterLikes
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit)
    .filter(char => char.likes > 0) // Solo incluir personajes con likes
    .map(char => char.id);
}; 