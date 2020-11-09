import React from "react";
import { Link } from "react-router-dom";
import {
  UserIsAuthenticated,
  Logout,
} from "../../Services/authenticationService";
import kotikokki from "../../kotikokki-logo.svg";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import NavMobile from "./NavMobile";
const Navbar = ({ hidden }) => {
  const { width } = GetWindowDimension();
  const history = useHistory();
  return (
    <>
      {width < 1100 ? (
        <NavMobile />
      ) : (
        <div className="main-nav">
          <Link to="/">
            <img className="logo" src={kotikokki} alt="kotikokki" />
          </Link>
          <div className="nav-items">
            <nav>
              <ul>
                <Link to="/howitworks">
                  <li>How it works</li>
                </Link>
                <Link to="/chefs">
                  <li>Chefs</li>
                </Link>
                <Link to="/shop">
                  <li>Order</li>
                </Link>
                {UserIsAuthenticated() && (
                  <Link to="/logout" onClick={() => Logout(history)}>
                    <li>Logout</li>
                  </Link>
                )}
                {!UserIsAuthenticated() && (
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                )}
                {UserIsAuthenticated() && (
                  <Link to="/profile">
                    <li>My Profile</li>
                  </Link>
                )}
                <CartIcon />
              </ul>
              {hidden ? null : <CartDropdown />}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
});
export default connect(mapStateToProps)(Navbar);
