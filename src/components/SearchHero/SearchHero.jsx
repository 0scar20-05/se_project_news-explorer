import "./SearchHero.css";

import SearchForm from "../SearchForm/SearchForm.jsx";

function SearchHero({ query, onSearch, onQueryChange }) {
  return (
    <section className="search-hero">
      <div className="search-hero__background" />
      <div className="search-hero__content">
        <h1 className="search-hero__title">What's going on in the world?</h1>
        <p className="search-hero__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm
          query={query}
          onSearch={onSearch}
          onQueryChange={onQueryChange}
        />
      </div>
    </section>
  );
}

export default SearchHero;
