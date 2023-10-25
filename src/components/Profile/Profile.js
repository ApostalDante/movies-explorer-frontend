import './Profile.css';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import isEmail from 'validator/lib/isEmail';


function Profile({ handleUpdateUser, signOut, getUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [lastName, setLastName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [lastEmail, setLastEmail] = React.useState(currentUser.email);
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');

  React.useEffect(() => {
    getUser();
  }, [isButtonDisabled]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ name, email });
    setButtonDisabled(false);
    setLastName(name);
    setLastEmail(email);
  };

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);
    if (!evt.target.checkValidity()) {
      setButtonDisabled(false);
      setErrorName('Что-то пошло не так...');
    } else {
      if (value !== lastName && value !== '' && email !== "" && isEmail(email)) {
        setButtonDisabled(true);
        setErrorName('');
      } else {
        setButtonDisabled(false);
        setErrorName('');
      }
    }
  };

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);
    if (!isEmail(value)) {
      setButtonDisabled(false);
      setErrorEmail('Некорректый адрес почты');
    } else {
      if (value !== lastEmail && value !== "" && name !== "" && name.length >= 2) {
        setButtonDisabled(true);
        setErrorEmail('');
      } else {
        setButtonDisabled(false);
        setErrorEmail('');
      }
    }
  };


  return (
    <main className="main-profile">
      <section className="profile">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h1 className="profile__greeting">Привет, {name}!</h1>
          <div className="profile__inputs">
            <h3 className="profile__title">Имя</h3>
            <div className="profile__items profile__items_type_name">
              <input
                className={`profile__input ${errorName ? 'profile__input_type_color-error' : ''}`}
                value={name}
                minLength={2}
                maxLength={30}
                type="text"
                onChange={handleNameChange}
                required
              />
              <span className={`profile__error ${errorName ? 'profile__error_type_active' : ''}`}>{errorName}</span>
            </div>
            <div className="profile__items profile__items_type_email">
              <input
                className={`profile__input ${errorEmail ? 'form__input_type_color-error' : ''}`}
                value={email}
                type="email"
                onChange={handleEmailChange}
                required
              />
              <span className={`profile__error ${errorEmail ? 'profile__error_type_active' : ''}`}>{errorEmail}</span>
            </div>
            <h3 className="profile__title">E-mail</h3>
          </div>
          <button to="/profile" className="profile__button" type="submit" disabled={!isButtonDisabled}>Редактировать</button>
          <button to="/" className="profile__link" type="button" onClick={signOut}>Выйти из аккаунта</button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
