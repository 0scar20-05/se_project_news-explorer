import "./About.css";

import avatar from "../../assets/images/PlaceAvatar.svg";

function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={avatar} alt="author avatar" />
      <div className="about__text-container">
        <h1 className="about__title">About the author</h1>
        <p className="about__description">
          This project is a news explorer application that allows users to
          search for and read news articles from various sources. It is built
          using React and follows best practices for responsive design and user
          experience.
        </p>
      </div>
    </section>
  );
}

export default About;
