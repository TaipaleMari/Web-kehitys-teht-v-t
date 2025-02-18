// src/components/Header.jsx
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="./hirvikarhu.png" alt="logo" />
        <span>My Website</span>
      </div>
      <nav>
        <a href="#koti">Etusivu</a>
        <a href="#about">Tietoa meistä</a>
        <a href="#services">Palvelut</a>
        <a href="#contact">Yhteystiedot</a>
      </nav>
    </header>
  );
};

export default Header;
