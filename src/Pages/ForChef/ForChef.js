import React, { Component } from "react";
import "../LoginPage/Login.css";
import { auth, createChefProfileDocument} from "../../firebase/firebase.utils";

class ForChef extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createChefProfileDocument(user, { name });

      //this clears the form
      this.setState({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password } = this.state;

    return(
    <div className="register-page">
    <div className="form">
    <form className="login-form">
    <input
    type="text"
    placeholder="name"
    autoFocus
    value={name}
    onChange={this.handleChange}
    />
    <input
    type="email"
    placeholder="email"
    autoFocus
    value={email}
    onChange={this.handleChange}
    />
    <input
    type="password"
    placeholder="password"
    value={password}
    onChange={this.handleChange}
    minLength="4"
    />
    <button
    type="submit"
    onClick={this.handleSubmit}
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
  }
}
export default ForChef;
