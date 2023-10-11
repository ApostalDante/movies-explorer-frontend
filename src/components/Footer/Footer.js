import "./Footer.css";


function Footer() {
  const dateThisYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">&#169; {dateThisYear}</p>
        <nav className="footer__nav">
          <a className="footer__link" href="https://practicum.yandex.ru/profile/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/ApostalDante" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;