import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import HeaderLogo from "../../images/header__logo.svg";
import Navigation from "../Navigation/Navigation";
import NavAuthorized from "../NavAuthorized/NavAuthorized";


function Header({ isLogginIn }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === '/' ? 'header_type_authorized' : ''}`}>
      <Link to="/" className="header__link">
        <img className="header__logo"
          alt="Логотип"
          src={HeaderLogo} />
      </Link>
      {isLogginIn ? <Navigation /> : <NavAuthorized />}
    </header>
  );
};

export default Header;
