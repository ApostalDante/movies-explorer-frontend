import './MoviesCard.css';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function MoviesCard({ card, toggleCardFavorites, favoritCard }) {
  const [favorites, setFavorites] = React.useState(false);
  const { pathname } = useLocation();
  const isSavedMoviesCard = (pathname === '/saved-movies');
  const cardImg = isSavedMoviesCard ? card.image : `https://api.nomoreparties.co${card.image.url}`;
  const cardDuration = getMovieDurationMinHours(card.duration);

  function getMovieDurationMinHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} ч ${minutes} м`;
  };

  function addFavoritesCard() {
    const favoritesCard = favoritCard.filter((obj) => {
      return obj.movieId === card.id;
    });
    toggleCardFavorites({ ...card, _id: favoritesCard.length > 0 ? favoritesCard[0]._id : null }, !favorites);
  };

  function deleteFavoritesCard(evt) {
    evt.preventDefault();
    toggleCardFavorites(card, false);
  };

  React.useEffect(() => {
    if (!isSavedMoviesCard) {
      const favoritesCard = favoritCard.filter((obj) => {
        return obj.movieId === card.id;
      });

      if (favoritesCard.length > 0) {
        setFavorites(true);
      } else {
        setFavorites(false);
      }
    }
  }, [pathname, favoritCard, card.id]);

  return (
    <li className="card">
      <Link to={card.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img src={cardImg} alt={card.nameRU} className="card__image"></img>
      </Link>
      <div className="card__element">
        <h2 className="card__title">{card.nameRU}</h2>
        <div className="card__buttons">
          {isSavedMoviesCard ? (
            <button type="button" name="delete" className="card__button card__button_delete" onClick={deleteFavoritesCard} />
          ) : (
            <button
              type="button"
              name="favorites"
              className={`card__button card__button${favorites ? '_active' : '_inactive'}`}
              onClick={addFavoritesCard}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{cardDuration}</p>
    </li>
  );
};

export default MoviesCard;