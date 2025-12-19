import "./App.css";

// React imports
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Utils/API
import { filterNewsData, searchNews } from "../../utils/newsApi";
import { checkToken, authorize, login } from "../../utils/auth";
import { saveArticle, getItems, removeItem } from "../../utils/api";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchedArticles, setSearchedArticles] = useState([]);

  const createCard = (article, keyword) => {
    const articleToSave = {
      ...article,
      keyword: keyword,
    };
    saveArticle(articleToSave)
      .then((savedArticle) => {
        setSavedArticles((prev) =>
          prev.find((item) => item.url === savedArticle.url)
            ? prev
            : [savedArticle, ...prev]
        );
      })
      .catch(console.error);
  };

  const [activeModal, setActiveModal] = useState(null);

  const closeActiveModal = () => {
    setActiveModal(null);
  };

  function handleRegisterClick() {
    setActiveModal("register");
  }

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleProfileClick() {
    setActiveModal("profile");
  }

  useEffect(() => {
    if (isLoggedIn) return;
    getItems()
      .then((items) => {
        setSavedArticles(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchKeyword(trimmedQuery);
    setHasSearched(true);
    setVisibleCards(3);

    if (!trimmedQuery) return;
    setIsLoading(true);
    searchNews(trimmedQuery)
      .then((data) => {
        const filtered = data.articles.map(filterNewsData);
        setSearchedArticles(filtered);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = ({ name, email, password }) => {
    return authorize({ name, email, password }).catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const deleteCardHandler = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setSavedArticles((prev) => prev.filter((item) => item._id !== itemId));
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn, currentUser, onLogout: handleLogout }}
    >
      <div className="page">
        <div className="page__content">
          <Header onLogin={handleLoginClick} onProfile={handleProfileClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  createCard={createCard}
                  articles={searchedArticles}
                  onSearch={handleSearch}
                  hasSearched={hasSearched}
                  query={query}
                  onQueryChange={setQuery}
                  onDelete={deleteCardHandler}
                  searchKeyword={searchKeyword}
                  isLoading={isLoading}
                  visibleCards={visibleCards}
                  onShowMore={handleShowMore}
                  savedArticles={savedArticles}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    articles={savedArticles}
                    onDelete={deleteCardHandler}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onRegister={handleRegisterClick}
            onLogin={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onLogin={handleLoginClick}
            onRegister={handleRegister}
          />
          <Profile
            isOpen={activeModal === "profile"}
            onClose={closeActiveModal}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
