import "../Form/Form.css"
import React from "react";
import { Link } from 'react-router-dom';
import HeaderLogo from "../../images/header__logo.svg";
import isEmail from "validator/lib/isEmail";


function Login() {
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
    }

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={HeaderLogo} alt="Логотип"></img>
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__inputs" onSubmit={handleSubmit}>
          <div className="form__items">
            <label className="form__item">
              <h3 className="form__item-title">E-mail</h3>
              <input
                className={`form__input ${errors.email ? 'form__input_type_color-error' : ''}`}
                name="email"
                type="email"
                placeholder="Введите почту"
                value={inputValues.email || ''}
                onChange={handleInputChange}
                required
              />
              <p className={`form__error ${errors.email ? 'form__error_type_active' : ''}`}>{errors.email}</p>
            </label>

            <label className="form__item">
              <h3 className="form__item-title">Пароль</h3>
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
              <p className={`form__error ${errors.password ? 'form__error_type_active' : ''}`}>{errors.password}</p>
            </label>
          </div>
          <button className={`form__button ${isValid ? "" : "form__button_type_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Войти</button>
        </form>
        <p className="form__question">
          <span className="form__question-description">Ещё не зарегистрированы?</span>
          <Link to="/signup" className="form__link">Регистрация</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;