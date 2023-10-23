import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';
import "./App.css";


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [isLogginIn, setIsLogginIn] = useState(false);
  const { pathname } = useLocation();
  const isVisibilityHeader = (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile');
  const isVisibilityFooter = (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies');


  function handleRegister({ name, email, password }) {
    MainApi.setUserRegistration({ name, email, password })
      .then((res) => {
        handleLogin({ email, password });
        setPopupTitle('Вы успешно зарегистрировались!');
        setIsOpenPopup(true);
      })
      .catch((err) => {
        setPopupTitle(`Что-то пошло не так! Ошибка регистрации ${err}`);
        setIsOpenPopup(true);
      })
  };

  function handleLogin({ email, password }) {
    MainApi.setUserAuthorization(email, password)
      .then(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          setIsLogginIn(true);
          getUser();
          navigate("/");
        }
      })
      .catch((err) => {
        setPopupTitle(`Что-то пошло не так! Ошибка авторизации ${err}`);
        setIsOpenPopup(true);
      })
  };

  function getUser() {
    MainApi.getProfileDataInServer()
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setIsLogginIn(true);
      })
      .catch((err) => console.log(`Что-то пошло не так! Ошибка сервера ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi
        .getProfileDataInServer()
        .then((res) => {
          if (res) {
            setIsLogginIn(true);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
        });
      return;
    }
    setIsLogginIn(false)
  };
  useEffect(() => {
    checkToken();
  }, [isLogginIn]);

  function handleUpdateUser({ name, email }) {
    MainApi.sendProfileDataToServer({ name, email })
      .then(() => {
        openPopup('Данные успешно изменены!');
      })
      .catch((err) => {
        openPopup(`Что-то пошло не так! ${err}`);
      });
  };

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('films');
    localStorage.removeItem('cardTumbler');
    localStorage.removeItem('inputSearchCard');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('savedFilmsTumbler');
    localStorage.removeItem('savedFilmsInputSearch');
    setIsLogginIn(false);
    navigate("/signin");
  };

  function openPopup(textError) {
    setPopupTitle(textError);
    setIsOpenPopup(true);
  };

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle('');
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {isVisibilityHeader ? <Header isLogginIn={isLogginIn} /> : ''}
        <Routes>
          <Route
            path="/"
            element={
              <Main />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLogginIn={isLogginIn}
                isLoading={isLoading}
                openPopup={openPopup}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLogginIn={isLogginIn}
                openPopup={openPopup}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                currentUser={currentUser}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                handleUpdateUser={handleUpdateUser}
                element={Profile}
                isLogginIn={isLogginIn}
                signOut={handleSignOut}
                getUser={getUser}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isVisibilityFooter ? <Footer /> : ''}
        <Popup text={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;