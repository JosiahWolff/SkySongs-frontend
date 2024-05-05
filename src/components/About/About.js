import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="about__author_section">
        <h1 className="about__title">About The Author</h1>
        <div className="about__author_details">
          <div className="about__author_info">
            <p className="about__author_text">
              My name is Josiah Wolff and this is my last project in the
              TripleTen full-stack software enginnering program. I am
              young,ambitious, and ready for new opprituinities. I enjoy working
              out, playing sports, and spending time with friends and family.
            </p>
          </div>
        </div>
      </section>
      <section className="about__website_section">
        <h1 className="about__title">About The Website</h1>
        <div className="about__website_info">
          <p className="about__website_text">
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
