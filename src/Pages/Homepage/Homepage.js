import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-text">
        <p className="headline">
          Kotikokki connects the community with home-made food.
        </p>
        <p className="homepage-content">
          If cooking is your hobby, passion or you simply want to share your
          food with others as well as reduce food waste, Kotikokki is for you.
        </p>
        <button className="start-button">
          <Link to="/signup">Get Started</Link>
        </button>
      </div>
      <img
        className="homepage-img"
        src="https://source.unsplash.com/6MT4_Ut8a3Y"
        alt="home-page"
      />
    </div>
  );
};

export default Homepage;
