// описание запросов к сервису beatfilm-movies.
class Api {
  constructor(apihUrl) {
    this._link = apihUrl;
  };

  _checkResponseProcessingServer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  };

  getMovies() {
    return fetch(`${this._link}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponseProcessingServer);
  };
};

const MoviesApi = new Api("https://api.nomoreparties.co");

export default MoviesApi;