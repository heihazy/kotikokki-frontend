import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media">
        <span className="icon">
          <FontAwesomeIcon icon={faInstagramSquare} />
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faFacebook} />
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </div>
      <p className="footer-text">&#169; Kotikokki</p>
    </div>
  );
};

export default Footer;
