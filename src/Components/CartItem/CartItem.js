import React from "react";
import "./CartItem.css";

const CartItem = ({ item: { dishImageUrl, price, name, quantity } }) => {
  return (
    <div className="cart-item">
      <img src={dishImageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x €{price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
