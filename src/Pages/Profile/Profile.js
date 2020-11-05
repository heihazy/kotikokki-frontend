import "./Profile.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const Profile = () => {
  const [currentProfile] = useState(window.localStorage.getItem("kotiKokkiID"));
  const [name, setName] = useState();
  const [intro, setIntro] = useState();
  const [dishes, setDishes] = useState();
  const [phone, setPhone] = useState();
  const [dishName, setDishName] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [dishDescription, setDishDescription] = useState();
  const [dishImageUrl, setDishImageUrl] = useState();
  const [dishAvailability, setDishAvailability] = useState();

  useEffect(() => {
    const getProfileInfo = async () => {
      console.log(currentProfile);
      const result = await fetch(
        "https://kotikokki.herokuapp.com/api/v1/users/" + currentProfile,
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
        console.log(currentProfile);
        console.log(json);
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

  const editContent = () => {
    document.querySelector(".edit-profile-button").hidden = true;
    document.querySelector(".save-profile-button").hidden = false;
    document.querySelector(".add-dish-wrapper").style.display = "block";
    document.querySelector(".dish-form").style.display = "flex";
    document.querySelector(".add-dish-form").style.display = "grid";
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
    let newDishes = dishes;
    if (dishName) {
      const dish = {
        id: uuidv4(),
        name: dishName,
        description: dishDescription,
        dishImageUrl: dishImageUrl,
        price: dishPrice,
        availability: dishAvailability,
      };
      newDishes = [...dishes, dish];
    }
    const result = await fetch(
      "https://kotikokki.herokuapp.com/api/v1/users/" + currentProfile,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.querySelector(".profile-name").textContent,
          intro: document.querySelector(".profile-intro").textContent,
          phone: document.querySelector(".profile-phone").textContent,
          dishes: newDishes,
        }),
      }
    );
    const json = await result.json();
    if (json.status !== "success") {
      alert("Unsuccesfull edit.");
    } else {
      setDishes(newDishes);
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
  };

  const deleteDish = async (id) => {
    const newDishes = dishes.filter((dish) => dish.id !== id);
    const result = await fetch(
      "https://kotikokki.herokuapp.com/api/v1/users/" + currentProfile,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishes: [newDishes],
        }),
      }
    );
    const json = await result.json();
    if (json.status !== "success") {
      alert("Unsuccesfully delted dish");
    } else {
      setDishes(newDishes);
    }
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
        <ul className="dish-list">
          {dishes &&
            dishes.map((dish) => (
              <li key={dish.id}>
                {dish.name}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteDish(dish.id)}
                />
              </li>
            ))}
        </ul>
        <div className="add-dish-wrapper" hidden>
          <div className="add-dish-form">
            <label className="dish-form">
              Name:
              <input
                className="add-dish-input dish-name"
                placeholder="Add a name"
                onChange={(e) => setDishName(e.target.value)}
              />
            </label>
            <label className="dish-form">
              Description:
              <input
                className="add-dish-input dish-description"
                placeholder="Add description"
                onChange={(e) => setDishDescription(e.target.value)}
              />
            </label>
            <label className="dish-form">
              Price:
              <input
                className="add-dish-input dish-price"
                placeholder="Add price"
                onChange={(e) => setDishPrice(e.target.value)}
              />
            </label>
            <label className="dish-form">
              Image URL:
              <input
                className="add-dish-input dish-img"
                placeholder="Add image"
                onChange={(e) => setDishImageUrl(e.target.value)}
              />
            </label>
            <label className="dish-form dish-date">
              Available until:
              <input
                type="date"
                className="add-dish-input dish-img"
                placeholder="Enter date"
                onChange={(e) => setDishAvailability(e.target.value)}
              />
            </label>
          </div>
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
