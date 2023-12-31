import "./Navigation.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";


function Navigation() {
  const [showPopup, setShowPopup] = React.useState(false);
  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const { pathname } = useLocation();


  return (
    <nav className="navigation">
      <button className="navigation__popup-button" type="button" name="popup" onClick={handleOpenPopup}></button>
      <div className={`navigation__popup ${showPopup ? "navigation__popup_type_visible" : ""}`}>
        <div className="navigation__sidebar">
          <div className="navigation__list-container">
            <button className="navigation__close-button" type="button" name="close" onClick={handleClosePopup}></button>
            <ul className="navigation__list">
              <li className="navigation__list-item navigation__list-item_type_main">
                <Link to="/" className="navigation__link" onClick={handleClosePopup}>Главная</Link>
              </li>
              <li className="navigation__list-item">
                <Link to="/movies" className="navigation__link" onClick={handleClosePopup}>Фильмы</Link>
              </li>
              <li className="navigation__list-item">
                <Link to="/saved-movies" className="navigation__link" onClick={handleClosePopup}>Сохранённые фильмы</Link>
              </li>
            </ul>
          </div>
          <Link to="/profile" className={`navigation__link ${pathname === '/' ? 'navigation__link_type_profile-blue' : 'navigation__link_type_profile-dark'}`} onClick={handleClosePopup}></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
