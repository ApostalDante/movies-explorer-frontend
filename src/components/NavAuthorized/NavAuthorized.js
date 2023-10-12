import "./NavAuthorized.css";
import { Link } from 'react-router-dom';


function NavAuthorized() {
  return (
    <nav className="nav-auth">
      <Link to="/signup" className="nav-auth__link">Регистрация</Link>
      <Link to="/signin" className="nav-auth__link nav-auth__link_signin">Войти</Link>
    </nav>
  );
};

export default NavAuthorized;