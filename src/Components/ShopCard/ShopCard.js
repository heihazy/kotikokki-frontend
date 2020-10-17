import React from 'react';
import './ShopCard.css';
const ShopCard = ({name, price, imageUrl}) => {
    return (
        <div className='shop-item'>
            <div className='image' style={{backgroundImage:`url(${imageUrl})`}}/>
            <div className='card-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <button className='add-btn'>ADD TO CART</button>
        </div>
    );
}

export default ShopCard;
