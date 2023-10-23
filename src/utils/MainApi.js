// описание запросов к нашему Api
class Api {
  constructor(userUrl) {
    this._userUrl = userUrl;
  };

  _checkResponseProcessingServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`код ошибки: ${res.status}`);
  };

  setUserRegistration({ name, email, password }) {
    return fetch(`${this._userUrl}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponseProcessingServer);
  };

  setUserAuthorization(email, password) {
    return fetch(`${this._userUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponseProcessingServer)
      .then((user) => {
        if (user) localStorage.setItem('jwt', user.token)
      });
  };

  checkToken(token) {
    return fetch(`${this._userUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponseProcessingServer);
  };

  getSavedMovies() {
    return fetch(`${this._userUrl}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponseProcessingServer);
  };

  addMovies(data) {
    return fetch(`${this._userUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this._checkResponseProcessingServer);
  }


  deleteMovie(movieId) {
    return fetch(`${this._userUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponseProcessingServer);
  };

  getProfileDataInServer() {
    return fetch(`${this._userUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponseProcessingServer);
  };

  sendProfileDataToServer({ name, email }) {
    return fetch(`${this._userUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponseProcessingServer);
  };
};

const MainApi = new Api("https://api.movies.dante.nomoredomainsrocks.ru");

export default MainApi;