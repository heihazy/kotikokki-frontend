import React from "react";
import { Link } from "react-router-dom";

import kotikokki from "../../kotikokki-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="main-nav">
      <img className="logo" src={kotikokki} alt="kotikokki" />
      <div className="nav-items">
        <nav>
          <ul>
            <li>About us</li>
            <li>How it works</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <span className="shopping-bag">
        <FontAwesomeIcon icon={faShoppingBag} />
      </span>
    </div>
  );
};

export default Navbar;
