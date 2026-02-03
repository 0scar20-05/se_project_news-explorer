import { NavLink } from "react-router-dom";
import "./Footer.css";
import Github from "../../assets/images/github.svg";
import LinkedIn from "../../assets/images/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="copyright">© 2025 News Explorer, Powered by News API</p>
      <div className="footer__mobile-wrapper">
        <NavLink className="footer__home-nav-link" to="/">
          <button className="footer__home-btn">Home</button>
        </NavLink>
        <a
          href="https://tripleten.com"
          target="_blank"
          className="footer__tripleten-nav-link"
        >
          <button className="triple__ten-btn">TripleTen</button>
        </a>
      </div>
      <a
        href="https://github.com/0scar20-05"
        target="_blank"
        className="footer__github-nav-link"
      >
        <button className="github-btn">
          {<img src={Github} alt="GitHub" />}
        </button>
      </a>
      <a
        href="https://www.linkedin.com/in/oscar-nies-8645b4276/"
        target="_blank"
        className="footer__linkedin-nav-link"
        to="https://www.linkedin.com/in/oscar-nies-8645b4276/"
      >
        <button className="linkedin-btn">
          {<img src={LinkedIn} alt="LinkedIn" />}
        </button>
      </a>
    </footer>
  );
}

export default Footer;
