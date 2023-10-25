import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

function Movies({ openPopup }) {
  const [cards, setCards] = React.useState(null);
  const [cardsSaved, setCardsSaved] = useState(null);
  const [errorsInfo, setErrorsInfo] = React.useState('');
  const [cardTumbler, setCardTumbler] = React.useState(false);
  const [preloader, setPreloader] = useState(false);
  const [inputSearchCard, setInputSearchCard] = useState('');
  const [MoviesCount, setMoviesCount] = useState([]);;
  const [cardsShowed, setCardsShowed] = React.useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [cardShowedWithTumbler, setCardShowedWithTumbler] = useState([]);

  async function getCardMovies(inputSearch) {
    setCardTumbler(false);
    localStorage.setItem('cardTumbler', false);

    if (!inputSearch) {
      setErrorsInfo('Нужно ввести ключевое слово');
      return false;
    }

    setErrorsInfo('');
    setPreloader(true);

    try {
      const data = await moviesApi.getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      localStorage.setItem('cards', JSON.stringify(filterData));
      localStorage.setItem('filmsInputSearch', inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);
      setCardsShowed(spliceData);
      setCards(filterData);
      setCardShowedWithTumbler(spliceData);
      setFilmsWithTumbler(filterData);
    } catch (err) {
      setErrorsInfo(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setCards([]);
      localStorage.removeItem('cards');
      localStorage.removeItem('filmsTumbler');
      localStorage.removeItem('cardTumbler');
      localStorage.removeItem('filmsInputSearch');;
    } finally {
      setPreloader(false);
    }
  };

  async function toggleCardsFavorite(film, favorite) {
    if (favorite) {
      const cardObg = {
        country: film.country,
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: 'https://api.nomoreparties.co' + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + film.image.url,
        movieId: film.id,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await mainApi.addMovies(cardObg);
        const newSaved = await mainApi.getSavedMovies();
        setCardsSaved(newSaved);
      } catch (err) {
        openPopup('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovie(film._id);
        const newSaved = await mainApi.getSavedMovies();
        setCardsSaved(newSaved);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  };

  async function getSwitchCard(tumbler) {
    let filterShowed = [];
    let filter = [];
    if (tumbler && cards) {
      setCardShowedWithTumbler(cardsShowed);
      setFilmsWithTumbler(cards);
      filterShowed = cardsShowed.filter(({ duration }) => duration <= 40);
      filter = cards.filter(({ duration }) => duration <= 40);
    } else {
      filterShowed = cardShowedWithTumbler;
      filter = filmsWithTumbler;
    }

    localStorage.setItem('cards', JSON.stringify(filterShowed.concat(filter)));
    localStorage.setItem('filmsTumbler', tumbler);
    setCardsShowed(filterShowed);
    setCards(filter);
  };

  function handleMore() {
    const splic = cards;
    const newShowed = cardsShowed.concat(splic.splice(0, MoviesCount[1]));
    setCardsShowed(newShowed);
    setCards(splic);
  };

  function getCardsCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const cardsCountConfig = {
      '1279': [16, 4],
      '989': [12, 3],
      '758': [8, 2],
      '320': [5, 1],
    };

    Object.keys(cardsCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = cardsCountConfig[key];
        }
      });
    return countCards;
  };
  useEffect(() => {
    setMoviesCount(getCardsCount());
    const handlerResize = () => setMoviesCount(getCardsCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setCardsSaved(data);
      })
      .catch((err) => {
        openPopup(`Ошибка сервера ${err}`);
      });

    const localStorageFilms = localStorage.getItem('cards');
    const localStorageTumbler = localStorage.getItem('cardTumbler');
    const localStorageInputSearch = localStorage.getItem('inputSearchCard');

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setCardsShowed(filterData.splice(0, getCardsCount()[0]));
      setCards(filterData);
      setPreloader(false);
    }
    if (localStorageTumbler) {
      setCardTumbler(localStorageTumbler === 'true');
    }
    if (localStorageInputSearch) {
      setInputSearchCard(localStorageInputSearch);
    }
  }, [openPopup]);

  return (
    <div className="movies">
      <SearchForm
        getCardMovies={getCardMovies}
        cardTumbler={cardTumbler}
        inputSearchCard={inputSearchCard}
        getSwitchCard={getSwitchCard}
      />
      {!preloader || <Preloader />}
      <div className="movies__text-error">{errorsInfo}</div>
      {cards !== null && cardsSaved !== null && cardsShowed !== null && !preloader && !errorsInfo && (
        <MoviesCardList
          buttonMore={handleMore}
          foundCard={cards}
          cards={cardsShowed}
          toggleCardsFavorite={toggleCardsFavorite}
          favoritCard={cardsSaved} />
      )}
    </div>
  );
};

export default Movies;