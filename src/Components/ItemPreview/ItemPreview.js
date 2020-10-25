import React, { useState, useEffect } from "react";
import "./ItemPreview.css";
import ShopCard from "../ShopCard/ShopCard";

const ItemPreview = ({ items }) => {
  const [renderDish, setRenderDish] = useState();

  useEffect(() => {
    const getDishes = async () => {
      const result = await fetch("https://kotikokki.herokuapp.com/api/v1/users/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      if (json.status !== "success") {
        alert("Sorry, could not get dishes. Try again later.");
      } else {
        const dishLists = json.data.users.map((user) => user.dishes);
        dishLists.forEach((list) => {
          const dishList = list.map((item) => (
            <ShopCard key={item.name} item={item} />
          ));
          setRenderDish(dishList);
        });
      }
    };
    getDishes();
  }, []);
  return (
    <div className="item-preview">
      <h1 className="title">Top picks</h1>
      <div className="preview">{renderDish}</div>
    </div>
  );
};

export default ItemPreview;
