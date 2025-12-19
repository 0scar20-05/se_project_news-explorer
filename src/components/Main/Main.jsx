import "./Main.css";
import SearchHero from "../SearchHero/SearchHero.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

function Main({
  createCard,
  articles,
  onDelete,
  onSearch,
  searchKeyword,
  isLoading,
  hasSearched,
  visibleCards,
  onShowMore,
  savedArticles,
  query,
  onQueryChange,
}) {
  return (
    <main>
      <SearchHero
        onSearch={onSearch}
        query={query}
        onQueryChange={onQueryChange}
      />
      {hasSearched && (
        <section className="container news-results">
          {isLoading ? (
            <Preloader className="news-results__preloader" />
          ) : !isLoading && articles.length === 0 ? (
            <NothingFound />
          ) : (
            <>
              <h1 className="news-results__title">Search results</h1>

              <div className="news-cards-container">
                {articles.slice(0, visibleCards).map((article) => (
                  <NewsCard
                    key={article.url}
                    article={article}
                    onDelete={onDelete}
                    onSave={createCard}
                    searchKeyword={searchKeyword}
                    savedArticles={savedArticles}
                    isSaved={false}
                  />
                ))}
              </div>

              {visibleCards < articles.length && (
                <button
                  className="news-results__show-more"
                  onClick={onShowMore}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
