import React from 'react';
import '../styles/LocationCard.css';
import { FaUser, FaHome, FaStar } from 'react-icons/fa';

const LocationCard = ({ location }) => {
  const {
    id,
    title,
    description,
    price,
    rating,
    superhost,
    capacity,
    image
  } = location;

  return (
    <div className="location-card" key={id}>
      <div className="image-container">
        <img src={image} alt={title} />
        {superhost && (
          <div className="superhost-badge">
            Superhost
            <FaStar className="superhost-star" />
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="capacity-info">
          <span className="capacity-item">
            <FaUser className="capacity-icon" />
            {capacity.people} guests
          </span>
          <span className="capacity-item">
            <FaHome className="capacity-icon" />
            {capacity.bedrooms} bedrooms
          </span>
        </div>
        <div className="divider"></div>
        <div className="card-footer">
          <div className="price">
            ${price}/night
          </div>
          <div className="rating">
            <FaStar className="star-icon" />
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
