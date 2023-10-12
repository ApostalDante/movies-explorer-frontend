import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';


function MoviesCard({ card }) {
  const [favorites, setFavorites] = React.useState(false);
  const { pathname } = useLocation();

  function handleFavoritesToogle() {
    setFavorites(!favorites);
  };

  return (
    <li className="card">
      <img src={card.image} alt={card.title} className="card__image"></img>
      <div className="card__element">
        <h2 className="card__title">{card.title}</h2>
        <div className="card__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" name="delete" className="card__button card__button_delete" />
          ) : (
            <button
              type="button"
              name="favorites"
              className={`card__button card__button${favorites ? '_active' : '_inactive'}`}
              onClick={handleFavoritesToogle}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{card.duration}</p>
    </li>
  );
};

export default MoviesCard;