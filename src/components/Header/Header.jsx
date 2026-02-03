import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logout__black from "../../assets/images/logoutB.svg";
import logout__white from "../../assets/images/logoutW.svg";
import menu__white from "../../assets/images/menu.svg";
import menu__black from "../../assets/images/menu black.svg";
import close from "../../assets/images/X.svg";

function Header({ onLogin, onProfile }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className={`header ${isSavedNewsPage ? "header_black" : ""}`}>
        <div className="header__content">
          <NavLink
            to="/"
            className={`header__title ${
              isSavedNewsPage ? "header__title_black" : ""
            }`}
          >
            <h1>NewsExplorer</h1>
          </NavLink>

          <nav className="header__nav-desktop">
            <NavLink
              to="/"
              className={`header__home-btn ${
                !isSavedNewsPage ? "header__home-btn_active" : ""
              }`}
            >
              Home
            </NavLink>

            {isLoggedIn && (
              <>
                <NavLink
                  to="/saved-news"
                  className={`header__saved-articles-btn ${
                    isSavedNewsPage ? "header__saved-articles-btn_active" : ""
                  }`}
                >
                  Saved articles
                </NavLink>

                <button className="header__user-btn" onClick={onProfile}>
                  {currentUser?.name}
                  <img
                    className="signout-btn"
                    src={isSavedNewsPage ? logout__black : logout__white}
                    alt="Logout"
                  />
                </button>
              </>
            )}

            {!isLoggedIn && (
              <button className="header__signin-btn" onClick={onLogin}>
                Sign in
              </button>
            )}
          </nav>

          <button
            className="header__menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <img
              src={
                isMobileMenuOpen
                  ? close
                  : isSavedNewsPage
                  ? menu__black
                  : menu__white
              }
              alt={isMobileMenuOpen ? "Close" : "Menu"}
            />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="header__mobile-menu" onClick={toggleMobileMenu}>
          <div
            className="header__mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header__mobile-header">
              <NavLink to="/" className="header__mobile-title">
                NewsExplorer
              </NavLink>

              <button
                className="header__mobile-close"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <img src={close} alt="Close" />
              </button>
            </div>

            <nav className="header__mobile-nav">
              <NavLink
                to="/"
                className="header__mobile-link"
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>

              {isLoggedIn && (
                <NavLink
                  to="/saved-news"
                  className="header__mobile-link"
                  onClick={toggleMobileMenu}
                >
                  Saved articles
                </NavLink>
              )}

              {isLoggedIn ? (
                <button
                  className="header__mobile-user-btn"
                  onClick={() => {
                    onProfile();
                    toggleMobileMenu();
                  }}
                >
                  {currentUser?.name}
                </button>
              ) : (
                <button
                  className="header__mobile-signin-btn"
                  onClick={() => {
                    onLogin();
                    toggleMobileMenu();
                  }}
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
