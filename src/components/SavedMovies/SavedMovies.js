import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/movies';


function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={savedMovies}
        buttonMore={false} />
    </div>
  );
};

export default SavedMovies;