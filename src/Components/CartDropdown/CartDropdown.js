import React from 'react';
import './CartDropdown.css';
import {connect} from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.action";

const CartDropdown = ({cartItems, history, dispatch}) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem)=>(
                        <CartItem key={CartItem.id} item={cartItem}/>
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <button onClick={()=>{
                history.push("/checkout");
                dispatch(toggleCartHidden());
            }} className='checkout-btn'>CHECKOUT</button>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
