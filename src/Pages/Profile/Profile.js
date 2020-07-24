import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-text">
        <p className="headline">John Doe</p>
        <p className="profile-content">
          Hi! I am John and I love making asian food. Usually, I make too much
          for me to eat, so why not share it with others? Check my menu and see
          if there is anything you like!
        </p>
        <button className="create-dish-button">
          <Link to="/">Create a dish</Link>
        </button>
      </div>
      <img
        className="profile-img"
        src="https://source.unsplash.com/6MT4_Ut8a3Y"
        alt="home-page"
      />
    </div>
  );
};

export default Profile;
