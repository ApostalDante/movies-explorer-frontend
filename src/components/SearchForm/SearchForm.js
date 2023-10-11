import './SearchForm.css';


function SearchForm() {
  return (
    <section className='search__form'>
      <form className="search">
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            required />
          <button type="submit" name="submit" className="search__button"></button>
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
    </section>
  );
};

export default SearchForm;
