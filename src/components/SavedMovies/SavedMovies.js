import './SavedMovies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi.js';


const SavedMovies = ({ openPopup }) => {
  const [cards, setCards] = React.useState(null);
  const [errorsInfo, setErrorsInfo] = React.useState('');
  const [cardTumbler, setCardTumbler] = React.useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = React.useState('');
  const [cardsShowed, setCardsShowed] = React.useState([]);
  const [cardWithSwitcher, setCardWithSwitcher] = React.useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = React.useState([]);

  const [delSearch, setDelSearch] = React.useState(false);

  async function toggleCardsFavorite(card, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovie(card._id);
        const newCard = await mainApi.getSavedMovies();
        setCards(newCard);
        setCardsShowed(newCard);
        setDelSearch(true);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  };

  function getSwitchCard(tumbler) {
    let filterDuration = [];
    if (tumbler) {
      setCardWithSwitcher(cards);
      setFilmsShowedWithTumbler(cardsShowed);
      filterDuration = cardsShowed.filter(({ duration }) => duration <= 40);
    } else {
      filterDuration = filmsShowedWithTumbler;
    }
    setCardsShowed(filterDuration);
  };

  async function getCardMovies(inputSearch, tumbler) {
    localStorage.setItem('savedCardTumbler', false);
    if (inputSearch === '') inputSearch = ' ';
    setErrorsInfo('');
    try {
      const data = cards;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      let filterDuration = filterData.filter(({ duration }) => duration <= 40);
      filterData = tumbler ? filterDuration : filterData;
      setCardsShowed(filterData);
      if (inputSearch) {
        localStorage.setItem('savedFilms', JSON.stringify(filterData));
        localStorage.setItem('savedCardTumbler', tumbler);
        localStorage.setItem('filmsInputSearch', inputSearch);
      } else {
        localStorage.removeItem('savedFilms');
        localStorage.removeItem('savedFilmsTumbler');
      }
    } catch (err) {
      setErrorsInfo(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
      setCards([]);
      localStorage.removeItem('savedFilms');
      localStorage.removeItem('savedCardTumbler');
      localStorage.removeItem('savedFilmsInputSearch');
    } finally {
      setErrorsInfo('');

      setDelSearch(false)
    }
  };

  React.useEffect(() => {
    localStorage.setItem('filmsInputSearch', ' ');
    getCardMovies();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mainApi.getSavedMovies();
        setCards(data);
        setCardsShowed(data);
      } catch (err) {
        openPopup(`Ошибка сервера ${err}`);
      }
    };

    const localStorageFilms = localStorage.getItem('savedFilms');
    if (localStorageFilms) {
      setCards(JSON.parse(localStorageFilms));
      const localStorageTumbler = localStorage.getItem('savedFilmsTumbler');
      const localStorageInputSearch = localStorage.getItem('savedFilmsInputSearch');

      if (localStorageTumbler) {
        setCardTumbler(localStorageTumbler === 'true');
      }
      if (localStorageInputSearch) {
        setFilmsInputSearch(localStorageInputSearch);
      }
    } else {
      fetchData();
    }
  }, [openPopup]);

  React.useEffect(() => {
    const localStorageInputSearch = localStorage.getItem('filmsInputSearch');
    getCardMovies(localStorageInputSearch);
  }, [delSearch]);

  return (
    <div className="saved-movies">
      <SearchForm
        getCardMovies={getCardMovies}
        cardTumbler={cardTumbler}
        inputSearchCard={filmsInputSearch}
        getSwitchCard={getSwitchCard}
      />
      <div className="saved-movies__text-error">{errorsInfo}</div>
      {cards !== null && !errorsInfo && (
        <MoviesCardList
          foundCard={[]}
          toggleCardsFavorite={toggleCardsFavorite}
          cards={cardsShowed} />
      )}
    </div>
  );
};

export default SavedMovies;