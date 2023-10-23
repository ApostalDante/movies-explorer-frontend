import './SearchForm.css';
import React from 'react';


function SearchForm({ getCardMovies, cardTumbler, inputSearchCard, getSwitchCard }) {
  const [inputSearch, setInputSearch] = React.useState('');
  const [switchMovie, setSwitchMovie] = React.useState(false);

  React.useEffect(() => {
    setInputSearch(inputSearchCard);
    setSwitchMovie(cardTumbler);
  }, [cardTumbler, inputSearchCard]);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  };

  function handleSwitchChange(evt) {
    const newSwitchMovie = !switchMovie;
    setSwitchMovie(newSwitchMovie);
    getSwitchCard(newSwitchMovie);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    getCardMovies(inputSearch)
  };

  return (
    <section className='search__form'>
      <form className="search">
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            value={inputSearch ?? ''}
            onChange={handleInputChange}
            required />
          <button type="submit" name="submit" className="search__button" onClick={handleSubmit}></button>
        </div>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input
              className="search__checkbox"
              type="checkbox"
              value={switchMovie}
              checked={switchMovie}
              onChange={handleSwitchChange}
            />
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
