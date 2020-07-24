import React from "react";
import "./Profile.css";
const Profile = () => {
  const editContent = () => {
    document.querySelector(".edit-profile-button").hidden = true;
    document.querySelector(".save-profile-button").hidden = false;
    [...document.querySelectorAll(".content-editable")].forEach((element) => {
      element.setAttribute("contenteditable", true);
      element.classList.add("edit-mode");
    });
    document.querySelector(".content-editable").focus();
  };

  const saveContent = async () => {
    const result = await fetch(
      "http://localhost:8000/api/v1/users/" + localStorage.getItem("id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.querySelector(".headline").textContent,
          intro: document.querySelector(".profile-content").textContent,
          phone: document.querySelector(".phone").textContent,
          // dishes: [document.querySelector("profile-dishes").textContent],
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
    }

    const getUpdatedUser = await fetch(
      "http://localhost:8000/api/v1/users/" + localStorage.getItem("id"),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedUserJson = await getUpdatedUser.json();
    console.log(updatedUserJson);
    if (json.status !== "success") {
      alert("Could not get updated information. Try to refresh page.");
    } else {
      localStorage.setItem("name", updatedUserJson.data.user.name);
      localStorage.setItem("intro", updatedUserJson.data.user.intro);
      localStorage.setItem("phone", updatedUserJson.data.user.phone);
    }
  };
  return (
    <div className="profile">
      <div className="profile-text">
        <p className="headline content-editable">
          {localStorage.getItem("name")}
        </p>
        <p className="profile-content content-editable">
          {localStorage.getItem("intro")}
        </p>
        {/* <p className="profile-dishes content-editable">No dishes yet.</p> */}
        <p className="profile-contact">
          Contact:
          <span className="content-editable phone">
            {localStorage.getItem("phone")}
          </span>
        </p>
        <button className="edit-profile-button" onClick={() => editContent()}>
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
      <img
        className="profile-img"
        src="https://source.unsplash.com/6MT4_Ut8a3Y"
        alt="home-page"
      />
    </div>
  );
};

export default Profile;
