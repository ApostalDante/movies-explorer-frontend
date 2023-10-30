import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';


function MoviesCardList({ cards, buttonMore, toggleCardsFavorite, favoritCard, foundCard }) {
  const { pathname } = useLocation();
  const isSavedMoviesCard = (pathname === '/saved-movies');
  const [tumbler, setTumbler] = React.useState(false);
  const localStorageTumbler = localStorage.getItem('cardTumbler');


  function fall() {
    if (localStorageTumbler !== 'true') {
      setTumbler(true)
    }
    if (localStorageTumbler === 'true') {
      setTumbler(false)
    }
  }
  React.useEffect(() => {
    fall()
  }, [localStorageTumbler]);


  return (
    <section className="cards">
      {cards.length > 0 ? (
        <ul className="cards__list">
          {cards.map((card) => (
            <MoviesCard
              key={card.id ?? card.movieId}
              card={card}
              toggleCardFavorites={toggleCardsFavorite}
              favoritCard={favoritCard}
            />
          ))}
        </ul>
      ) : (
        <div className="cards__info">Ничего не найдено</div>
      )}
      {foundCard.length > 0 && !isSavedMoviesCard && tumbler && (
        <div className="cards__button-container">
          <button className="cards__button" type="button" name="more" onClick={buttonMore}>Ещё</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;