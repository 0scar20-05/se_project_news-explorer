import "./SavedNewsHero.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHero({ articles }) {
  const { currentUser } = useContext(CurrentUserContext);

  const uniqueKeywords = [
    ...new Set(articles.map((article) => article.keyword)),
  ];
  const displayedKeywords = uniqueKeywords.slice(0, 2);
  const otherCount = uniqueKeywords.length - displayedKeywords.length;

  return (
    <section className="saved-news-hero">
      <p className="saved-news-hero__title">Saved Articles</p>
      <h1 className="saved-news-hero__greeting">
        {currentUser?.name}, you have {articles.length} saved articles
      </h1>
      <p className="saved-news-hero__tags">
        <span>By keywords: </span>
        <span className="saved-news-hero__tags-values">
          {displayedKeywords.join(", ")}
          {otherCount > 0 && `, and ${otherCount} others`}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHero;
