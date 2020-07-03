import React, { useState } from "react";
import "./Login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    if (form.checkValidity()) {
      const result = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await result.json();
      console.log(json);
    } else {
      form.reportValidity();
    }
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <div className="register-page">
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
            Sign up
          </button>
          <p className="message">
            Already registered? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
