import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './base/Navbar';
import CharacterCard from '../components/CharacterCard';
import '../style/component/characterSearch.css';

const CharacterSearch = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  const statusOptions = ['', 'alive', 'dead', 'unknown'];
  const genderOptions = ['', 'female', 'male', 'genderless', 'unknown'];

  const fetchCharacters = async (pageNum = 1, filterParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: pageNum,
        ...filterParams
      });

      const response = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Error al cargar personajes: ${response.status}`);
      }

      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setError(error.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page, filters);
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1); // Resetear a la primera página cuando cambian los filtros
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters(1, filters);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="character-search-container">
      <Navbar />
      <main className="character-search-main">
        <h1>Búsqueda de Personajes</h1>
        
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Buscar por nombre..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option || 'Todos'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="species">Especie:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={filters.species}
              onChange={handleFilterChange}
              placeholder="Buscar por especie..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Buscar por tipo..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Género:</label>
            <select
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              {genderOptions.map(option => (
                <option key={option} value={option}>
                  {option || 'Todos'}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">Buscar</button>
        </form>

        {loading && <div className="loading">Cargando personajes...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && characters.length === 0 && (
          <div className="no-results">No se encontraron personajes con los filtros seleccionados</div>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <div className="characters-grid">
              {characters.map(character => (
                <CharacterCard
                  key={character.id}
                  characterId={character.id}
                  characterName={character.name}
                  imageUrl={character.image}
                  onDetailsClick={() => {}}
                  onLikeClick={() => {}}
                  disableLike={true}
                />
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="pagination-button"
              >
                Anterior
              </button>
              <span className="page-info">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="pagination-button"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CharacterSearch; 