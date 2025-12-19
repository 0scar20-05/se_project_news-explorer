import "./NothingFound.css";
import notFound from "../../assets/images/not-found.svg";

function NothingFound() {
  return (
    <section className="nothing-found">
      <img
        src={notFound}
        alt="Illustration showing a magnifying glass over a document"
        className="nothing-found__image"
      />
      <h2 className="nothing-found__title">Nothing found</h2>
      <p className="nothing-found__text">
        Sorry, we couldn’t find any articles matching your search.
      </p>
    </section>
  );
}

export default NothingFound;
