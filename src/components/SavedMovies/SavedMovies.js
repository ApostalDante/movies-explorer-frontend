import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/movies';


function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={savedMovies}
        buttonMore={false} />
    </main>
  );
};

export default SavedMovies;