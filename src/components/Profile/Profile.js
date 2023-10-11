import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Profile() {
  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__greeting">Привет, Виталий!</h2>
        <div className="profile__inputs">
          <h3 className="profile__title">Имя</h3>
          <div className="profile__items profile__items_type_name">
            <input
              className="profile__input"
              defaultValue="Виталий"
              minLength={2}
              maxLength={30}
              required />
          </div>
          <div className="profile__items profile__items_type_email">
            <input
              className="profile__input"
              defaultValue="pochta@pochta.ru"
              type="email"
              required />
          </div>
          <h3 className="profile__title">E-mail</h3>
        </div>
        <Link to="/profile" className="profile__button">Редактировать</Link>
        <Link to="/" className="profile__link">Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;
