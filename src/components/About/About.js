import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="author_section">
        <h1>About The Author</h1>
        <div className="author_details">
          <div className="author_info">
            <p className="author_text">
              My name is Josiah Wolff and this is my last project in the
              TripleTen full-stack software enginnering program. I am
              young,ambitious, and ready for new opprituinities. I enjoy working
              out, playing sports, and spending time with friends and family.
            </p>
          </div>
        </div>
      </section>
      <section className="about_section">
        <h1>About The Website</h1>
        <div className="about_info">
          <p className="about_text">
            This website is designed to display various songs based on different
            weather conditions. It also gives the user the ability to search
            specific songs from the spotify library and view the artist, author,
            and valenece. Valence describes the musical positiveness conveyed by
            a track. The higher the % the more positive.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
