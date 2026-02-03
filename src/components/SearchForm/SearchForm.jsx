import "./SearchForm.css";

const SearchForm = ({ query, onQueryChange, onSearch }) => {
  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search__bar"
        type="text"
        placeholder="Enter topic"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
