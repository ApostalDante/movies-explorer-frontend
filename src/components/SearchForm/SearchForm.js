import './SearchForm.css';


function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <input
          className="search__input"
          placeholder="Фильм"
          type="text"
          required />
        <button type="submit" className="search__button"></button>
      </div>
      <div className="search__toggle">
        <label className="search__tumbler">
          <input
            className="search__checkbox"
            type="checkbox" />
          <span className="search__slider" />
        </label>
        <p className="search__films">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
