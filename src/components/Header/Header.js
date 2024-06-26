import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import headerTitle from "../../images/headerTitle.svg";
import { Link } from "react-router-dom";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__section">
        <Link to="/SkySongs-frontend">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>
      </div>

      <img className="header__title" src={headerTitle} alt="header Title" />

      <div className="header__section">
        <nav className="dropdown">
          <button onClick={toggleDropdown} className="header__dropdown">
            <p className="dropdown__btntext">Nav</p>
          </button>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <Link to="/About">About</Link>
            <Link to="/SearchSpotify">Search</Link>
            <Link to="/SkySongs-frontend">Home</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
