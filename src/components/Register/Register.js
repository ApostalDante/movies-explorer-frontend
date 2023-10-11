import "../Form/Form.css"
import React from "react";
import { Link } from 'react-router-dom';
import HeaderLogo from "../../images/header__logo.svg";
import isEmail from "validator/lib/isEmail";


function Register() {
  const [inputValues, setInputValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты');
      } else {
        target.setCustomValidity('');
      }
    };

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <main className="main-form">
      <section className="form">
        <div className="form__container">
          <Link to="/" className="form__link">
            <img className="form__logo" src={HeaderLogo} alt="Логотип"></img>
          </Link>
          <h1 className="form__title">Добро пожаловать!</h1>
          <form className="form__inputs" onSubmit={handleSubmit}>
            <div className="form__items">
              <label className="form__item">
                <span className="form__item-title">Имя</span>
                <input
                  className={`form__input ${errors.name ? 'form__input_type_color-error' : ''}`}
                  name="name"
                  placeholder="Введите имя"
                  value={inputValues.name || ''}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={30}
                  type="text"
                  required />
                <span className={`form__error ${errors.name ? 'form__error_type_active' : ''}`}>Что-то пошло не так...</span>
              </label>

              <label className="form__item">
                <span className="form__item-title">E-mail</span>
                <input
                  className={`form__input ${errors.email ? 'form__input_type_color-error' : ''}`}
                  name="email"
                  type="email"
                  placeholder="Введите почту"
                  value={inputValues.email || ''}
                  onChange={handleInputChange}
                  required
                />
                <span className={`form__error ${errors.email ? 'form__error_type_active' : ''}`}>{errors.email}</span>
              </label>

              <label className="form__item">
                <span className="form__item-title">Пароль</span>
                <input
                  className={`form__input ${errors.password ? 'form__input_type_color-error' : ''}`}
                  name="password"
                  type="password"
                  minLength={8}
                  placeholder="Введите пароль"
                  value={inputValues.password || ''}
                  onChange={handleInputChange}
                  required
                />
                <span className={`form__error ${errors.password ? 'form__error_type_active' : ''}`}>{errors.password}</span>
              </label>
            </div>
            <button className={`form__button ${isValid ? "" : "form__button_type_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Зарегистрироваться</button>
          </form>
          <p className="form__question">
            <span className="form__question-description">Уже зарегистрированы?</span>
            <Link to="/signin" className="form__link">Войти</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;