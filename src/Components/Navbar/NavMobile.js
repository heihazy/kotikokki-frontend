import React, { useState } from "react";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import { animated, useSpring } from "react-spring";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  UserIsAuthenticated,
  Logout,
} from "../../Services/authenticationService";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../kotikokki-logo.svg";
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import "./NavMobile.css";
const NavMobile = ({ hidden }) => {
  const history = useHistory();
  const { width, height } = GetWindowDimension();
  const [open, setOpen] = useState(false);

  const animation = useSpring({
    height: open ? `${height}px` : "0px",
    opacity: open ? 1 : 0,
    width: open ? `${width / 1.5}px` : "0px",
    backgroundColor: "#f5b8d2",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: open ? "auto" : "none",
    display: "flex",
    flexDirection: "column",
    config: {
      duration: open ? 100 : 150,
    },
  });

  const Menu = () => (
    <div>
      {open && (
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          style={{
            backgroundColor: "transparent",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            color: "transparent",
          }}
          onClick={() => setOpen(!open)}
        />
      )}
      <animated.div style={animation} className="mobile-menu">
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
        </ul>
      </animated.div>
    </div>
  );
  return (
    <div className="mobile-nav">
      <Link to="/">
        <Logo className="logo-mobile" />
      </Link>
      <CartIcon />
      {hidden ? null : <CartDropdown />}
      <FaBars
        className="mobile-icon"
        onClick={() => setOpen(!open)}
        size="25px"
      />
      <Menu />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(NavMobile);
