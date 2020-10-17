import "./Profile.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [currentProfile] = useState(window.location.search.substring(1));
  const [name, setName] = useState();
  const [intro, setIntro] = useState();
  const [dishes, setDishes] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    const getProfileInfo = async () => {
      const result = await fetch(
        "http://localhost:8000/api/v1/users/" + currentProfile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await result.json();
      if (json.status !== "success") {
        alert("Could not get this profile. Try another one.");
      } else {
        setName(json.data.user.name);
        setIntro(json.data.user.intro);
        setPhone(json.data.user.phone);
        setDishes(json.data.user.dishes);
      }
    };
    getProfileInfo();
  }, [currentProfile]);

  const userIsProfileOwner = () => {
    return localStorage.getItem("kotiKokkiID") === currentProfile;
  };

  const deleteDish = (e) => {
    const dish = e.target.parentElement.parentElement.textContent;
    setDishes(dishes.filter((item) => item !== dish));
  };

  const createDishList = () =>
    dishes.map((dish) => (
      <li key={dish} className="content-editable">
        {dish}
        <FontAwesomeIcon icon={faTrash} onClick={(e) => deleteDish(e)} />
      </li>
    ));

  const editContent = () => {
    document.querySelector(".edit-profile-button").hidden = true;
    document.querySelector(".save-profile-button").hidden = false;
    document.querySelector(".add-dish-wrapper").style.display = "block";
    document.querySelector(".dish-form").style.display = "block";
    document.querySelector(".add-dish-form").style.display = "block";
    document.querySelector(".add-dish-input").value = "";
    document
      .querySelectorAll(".fa-trash")
      .forEach((icon) => (icon.style.display = "inline-block"));
    [...document.querySelectorAll(".content-editable")].forEach((element) => {
      element.setAttribute("contenteditable", true);
      element.classList.add("edit-mode");
    });
  };

  const saveContent = async () => {
    const result = await fetch(
      "http://localhost:8000/api/v1/users/" + currentProfile,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.querySelector(".profile-name").textContent,
          intro: document.querySelector(".profile-intro").textContent,
          phone: document.querySelector(".profile-phone").textContent,
          dishes: dishes,
        }),
      }
    );
    const json = await result.json();
    if (json.status !== "success") {
      alert("Unsuccesfull edit.");
    } else {
      [...document.querySelectorAll(".content-editable")].forEach((element) => {
        element.setAttribute("contenteditable", false);
        element.classList.remove("edit-mode");
      });
      document.querySelector(".save-profile-button").hidden = true;
      document.querySelector(".edit-profile-button").hidden = false;
      document.querySelector(".add-dish-wrapper").style.display = "none";
      document
        .querySelectorAll(".fa-trash")
        .forEach((icon) => (icon.style.display = "none"));
    }

    const data = await fetch(
      "http://localhost:8000/api/v1/dishes/" + currentProfile,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.querySelector(".profile-name").textContent,
          intro: document.querySelector(".profile-intro").textContent,
          phone: document.querySelector(".profile-phone").textContent,
          dishes: dishes,
        }),
      }
    )
  };

  const addNewDish = () => {
    const newDishValue = document.querySelector(".add-dish-input").value;
    document.querySelector(".add-dish-input").value = "";
    setDishes((currentDishes) => [...currentDishes, newDishValue]);
  };

  return (
    <div className="profile">
      <div className="profile-text">
        <h1 className="headline profile-name content-editable">{name}</h1>
        <h2>Introduction:</h2>
        <p className="profile-content profile-intro content-editable">
          {intro}
        </p>
        <h2>Contact:</h2>
        <p className="profile-content profile-phone content-editable">
          {phone}
        </p>
        <h1 className="headline">Menu</h1>
        <ul className="dish-list">{dishes && createDishList()}</ul>
        <div className="add-dish-wrapper" hidden>
          <div className='add-dish-form' >
          <label className='dish-form' >
            Name:
          <input
            className="add-dish-input dish-name" 
            placeholder="Add a name"
          />
          </label>
          <label className='dish-form' >
            Description:
          <input
            className="add-dish-input dish-description"
            placeholder="Add description"
          />
          </label>
          <label className='dish-form' >
            Price:
          <input
            className="add-dish-input dish-price"
            placeholder="Add price"
          />
          </label>
          <label className='dish-form' >
            Address:
          <input
            className="add-dish-input dish-address"
            placeholder="Add address"
          />
          </label>
          <label className='dish-form' >
            Image URL:
          <input
            className="add-dish-input dish-img"
            placeholder="Add image"
          />
          </label>
          <label className='dish-form dish-date' >
            Available until:
          <input type="date"
            className="add-dish-input dish-img"
            placeholder='Enter date'
          />
          </label>
          </div>
          
          <button className="add-dish-button" onClick={() => addNewDish()}>
            Add
          </button>
        </div>
        {userIsProfileOwner() && (
          <div>
            <button
              className="edit-profile-button"
              onClick={() => editContent()}
            >
              Edit profile
            </button>
            <button
              hidden
              className="save-profile-button"
              onClick={() => saveContent()}
            >
              Save profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
