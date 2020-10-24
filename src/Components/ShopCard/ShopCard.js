import React from 'react';
import './ShopCard.css';
import { addItem } from "../../redux/cart/cart.action";
import { connect } from "react-redux";

const ShopCard = ({item, addItem}) => {
    const {name, price, imageUrl} = item;
    return (
        <div className='shop-item'>
            <div className='image' style={{backgroundImage:`url(${imageUrl})`}}/>
            <div className='card-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <button className='add-btn' onClick={()=>addItem(item)}>ADD TO CART</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(ShopCard);
