import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


function MoviesCardList({ cards, buttonMore }) {
  const [isLoading, setLoading] = React.useState(false);

  const handlePreloader = () => {
    setLoading(true);
  };

  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </ul>

      {isLoading ? (
        <Preloader />
      ) : (
        buttonMore && (
          <div className="cards__button-container">
            <button className="cards__button" type="button" name="more" onClick={handlePreloader}>Ещё</button>
          </div>
        )
      )}
    </section>
  );
};

export default MoviesCardList;