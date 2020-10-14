import React, { useState } from "react";
import "./../LoginPage/Login.css";
import { Signup } from "../../Services/authenticationService";
import { useHistory } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isChef, setIsChef]=useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    if (form.checkValidity()) {
      Signup(email, password, name, history, isChef);
    } else {
      form.reportValidity();
    }
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0 && name.length > 0;
  };

  return (
    <div className="register-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div className="check-chef">
          <input type="checkbox" checked={isChef} onChange={()=>setIsChef(!isChef)}/>
          <label htmlFor='is-chef'>I am a homecook</label>
          </div>

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

export default SignupPage;
