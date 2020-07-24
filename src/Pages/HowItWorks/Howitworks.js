import React from "react";
import { Link } from "react-router-dom";
import "./Howitworks.css";

const Howitworks = () => {
  return (
    <div className="howitworks">
      <div className="howitworks-text">
        <p className="headline">
          Kotikokki connects the community with home-made food.
        </p>
        <p className="howitworks-content">
          If cooking is your hobby, passion or you simply want to share your
          food with others as well as reduce food waste, Kotikokki is for you.
        </p>
        <button className="start-button">
          <Link to="/signup">Get Started</Link>
        </button>
      </div>
      <img
        className="howitworks-img"
        src="https://source.unsplash.com/-bLkT8wGV0I/"
        alt="home-page"
      />
    </div>
  );
};

export default Howitworks;
