import React, { useState } from "react";
import "./Login.css";
import { Login } from "../../Services/authenticationService";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    if (form.checkValidity()) {
      Login(email, password, history);
    } else {
      form.reportValidity();
    }
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="email"
            placeholder="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="4"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            login
          </button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
