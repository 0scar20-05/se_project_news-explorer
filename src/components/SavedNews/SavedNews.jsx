import NewsCard from "../NewsCard/NewsCard.jsx";
import SavedNewsHero from "../SavedNewsHero/SavedNewsHero.jsx";

function SavedNews({ articles, onDelete }) {
  return (
    <section>
      <SavedNewsHero articles={articles} />

      <div className="news-cards-container">
        {articles.map((article) => (
          <NewsCard
            key={article._id}
            article={article}
            onDelete={onDelete}
            isSaved={true}
          />
        ))}
      </div>
    </section>
  );
}

export default SavedNews;
