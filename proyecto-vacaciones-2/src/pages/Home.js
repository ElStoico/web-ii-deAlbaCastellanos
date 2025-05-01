import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import LocationCard from '../components/locationCard';

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json');
        const data = await response.json();
        setLocations(data);
        setFilteredLocations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(location => 
        location.description.toLowerCase().includes(term)
      );
      setFilteredLocations(filtered);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Book unique places to stay and things to do.</h1>
          <h2>Unforgettable trips start with Airbnb</h2>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      
      <div className="locations-grid">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredLocations.length === 0 ? (
          <div className="no-results">No properties found matching your search.</div>
        ) : (
          filteredLocations.map(location => (
            <LocationCard 
              key={location.id} 
              location={{
                ...location,
                capacity: {
                  people: location.capacity.people,
                  bedrooms: location.capacity.bedroom
                }
              }} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
