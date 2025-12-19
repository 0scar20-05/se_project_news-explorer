import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import delete__btn from "../../assets/images/trash hover.svg";
import save__btn from "../../assets/images/saved hover.svg";
import save__btn_saved from "../../assets/images/saved marked.svg";

const NewsCard = ({
  article,
  onDelete,
  onSave,
  isSaved = false,
  searchKeyword,
  savedArticles = [],
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const alreadySaved = !isSaved
    ? savedArticles.find((item) => item.url === article.url)
    : null;

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) return;

    if (isSaved || alreadySaved) {
      const id = isSaved ? article._id : alreadySaved._id;
      onDelete?.(id);
    } else {
      onSave?.(article, searchKeyword);
    }
  };

  return (
    <section className="card">
      <div className="card__image-container">
        {isSaved && <div className="card__keyword">{article.keyword}</div>}

        {isSaved ? (
          <div className="card__btn-wrapper">
            <button className="card__delete-btn" onClick={handleAction}>
              {
                <img
                  className="card__delete-btn_img"
                  src={delete__btn}
                  alt="Delete"
                />
              }
            </button>
            <p className="card__delete-btn_message">Remove from saved</p>
          </div>
        ) : (
          <div className="card__btn-wrapper">
            <button className="card__save-btn" onClick={handleAction}>
              <img
                src={alreadySaved ? save__btn_saved : save__btn}
                className={alreadySaved ? "" : "card__save-btn_img"}
              />
            </button>
            {!isLoggedIn && (
              <p className="card__save-btn_message">Sign in to save articles</p>
            )}
          </div>
        )}
      </div>

      <a href={article.url} target="_blank" className="card__link">
        <img className="card__image" src={article.image} alt="news" />
        <div className="card__content">
          <p className="card__date">{article.publishedAt}</p>
          <h1 className="card__title">{article.title}</h1>
          <p className="card__subtitle">{article.description}</p>
          <h1 className="card__source">{article.source.toUpperCase()}</h1>
        </div>
      </a>
    </section>
  );
};

export default NewsCard;
