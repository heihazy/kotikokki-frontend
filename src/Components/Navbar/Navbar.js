import React from "react";
import { Link } from "react-router-dom";
import {
  UserIsAuthenticated,
  Logout,
} from "../../Services/authenticationService";
import kotikokki from "../../kotikokki-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  return (
    <div className="main-nav">
      <Link to="/">
        <img className="logo" src={kotikokki} alt="kotikokki" />
      </Link>
      <div className="nav-items">
        <nav>
          <ul>
            <Link to="/about">
              <li>About us</li>
            </Link>
            <Link to="/howitworks">
              <li>How it works</li>
            </Link>
            <Link to="/blog">
              <li>Blog</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            {UserIsAuthenticated() && (
              <Link to="/logout" onClick={() => Logout(history)}>
                <li>Logout</li>
              </Link>
            )}
            {!UserIsAuthenticated() && (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}
            {UserIsAuthenticated() && (
              <Link to="/profile">
                <li>My Profile</li>
              </Link>
            )}
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
