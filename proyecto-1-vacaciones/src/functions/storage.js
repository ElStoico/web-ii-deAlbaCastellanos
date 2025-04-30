// Prefijos para las claves de almacenamiento
const CHAPTER_LIKES_PREFIX = 'chapter_likes_';
const CHAPTER_DISLIKES_PREFIX = 'chapter_dislikes_';
const CHARACTER_LIKES_PREFIX = 'character_likes_';

// Funciones para capítulos
export const getChapterLikes = (chapterId) => {
  const likes = localStorage.getItem(`${CHAPTER_LIKES_PREFIX}${chapterId}`);
  return likes ? parseInt(likes) : 0;
};

export const setChapterLikes = (chapterId, count) => {
  localStorage.setItem(`${CHAPTER_LIKES_PREFIX}${chapterId}`, count.toString());
};

export const getChapterDislikes = (chapterId) => {
  const dislikes = localStorage.getItem(`${CHAPTER_DISLIKES_PREFIX}${chapterId}`);
  return dislikes ? parseInt(dislikes) : 0;
};

export const setChapterDislikes = (chapterId, count) => {
  localStorage.setItem(`${CHAPTER_DISLIKES_PREFIX}${chapterId}`, count.toString());
};

// Funciones para personajes en episodios específicos
export const getCharacterLikesInEpisode = (characterId, episodeId) => {
  const likes = localStorage.getItem(`${CHARACTER_LIKES_PREFIX}${characterId}_ep${episodeId}`);
  return likes ? parseInt(likes) : 0;
};

export const setCharacterLikesInEpisode = (characterId, episodeId, count) => {
  localStorage.setItem(`${CHARACTER_LIKES_PREFIX}${characterId}_ep${episodeId}`, count.toString());
};

// Función para obtener los personajes más populares de un episodio
export const getTopCharactersInEpisode = (characterIds, episodeId, limit = 3) => {
  const charactersWithLikes = characterIds.map(id => ({
    id,
    likes: getCharacterLikesInEpisode(id, episodeId)
  }));

  return charactersWithLikes
    .sort((a, b) => b.likes - a.likes)
    .filter(char => char.likes > 0)
    .slice(0, limit)
    .map(char => char.id);
};

// Funciones para el caché
export const getCachedEpisode = (episodeId) => {
  const cached = localStorage.getItem(`episode_${episodeId}`);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    // El caché expira después de 1 hora
    if (Date.now() - timestamp < 3600000) {
      return data;
    }
  }
  return null;
};

export const setCachedEpisode = (episodeId, data) => {
  localStorage.setItem(`episode_${episodeId}`, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

export const getCachedCharacter = (characterId) => {
  const cached = localStorage.getItem(`character_${characterId}`);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    // El caché expira después de 1 hora
    if (Date.now() - timestamp < 3600000) {
      return data;
    }
  }
  return null;
};

export const setCachedCharacter = (characterId, data) => {
  localStorage.setItem(`character_${characterId}`, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}; 