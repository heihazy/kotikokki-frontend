import React from "react";
import { Link } from "react-router-dom";
import "./Howitworks.css";

const Howitworks = () => {
  return (
    <div className="howitworks">
      <div className="howitworks-text">
        <p className="headline">
          Sell your home made food or buy from Kotikokki chefs!
        </p>
        <p className="howitworks-content">
          If you just want to buy real home made food and support your
          neighbours, take a look at our chef listing page. On each chef's
          profile, you will find their dishes and contact information.
        </p>
        <button className="start-button">
          <Link to="/chefs">Chefs</Link>
        </button>
        <p className="howitworks-content">
          Always make too much food? Join Kotikokki and sell your cookings for
          free!
        </p>
        <button className="start-button">
          <Link to="/signup">Join</Link>
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
