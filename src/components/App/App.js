import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import "./App.css";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <>
            <Header isLogginIn={false} />
            <Main />
            <Footer />
          </>
        } />
        <Route exact path="/movies" element={
          <>
            <Header isLogginIn={true} />
            <Movies />
            <Footer />
          </>
        } />
        <Route exact path="/saved-movies" element={
          <>
            <Header isLogginIn={true} />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route exact path="/signup" element={
          <>
            <Register />
          </>
        } />
        <Route exact path="/signin" element={
          <>
            <Login />
          </>
        } />
        <Route exact path="/profile" element={
          <>
            <Header isLogginIn={true} />
            <Profile />
          </>
        } />
        <Route exact path="*" element={
          <>
            <NotFound />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;