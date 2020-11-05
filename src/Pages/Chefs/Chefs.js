import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Chefs.css";

const Chefs = () => {
  const [chefs, setChefs] = useState();

  useEffect(() => {
    const getChefs = async () => {
      const result = await fetch(
        "https://kotikokki.herokuapp.com/api/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await result.json();
      if (json.status !== "success") {
        alert("Sorry, could not get chefs. Try again later.");
      } else {
        const chefList = json.data.users.map((user) => (
          <div className="chef-container">
            <Link key={user._id} to={"/profile?" + user._id}>
              <li>{user.name}</li>
            </Link>
          </div>
        ));
        setChefs(chefList);
      }
    };
    getChefs();
  }, []);

  return (
    <div className="chef-listing-page">
      <ul className="chef-list">{chefs}</ul>
    </div>
  );
};

export default Chefs;
