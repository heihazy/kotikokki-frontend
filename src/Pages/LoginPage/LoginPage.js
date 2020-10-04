import React, { Component } from "react";
import "./Login.css";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  submitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  changeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render(){
    return (
      <div className="login-page">
      <div className="form">
      <form className="login-form">
      <input
      type="email"
      placeholder="email"
      autoFocus
      value={this.state.email}
      onChange={this.changeHandler}
      />
      <input
      type="password"
      placeholder="password"
      value={this.state.password}
      onChange={this.changeHandler}
      minLength="4"
      />
      <button
      type="submit"
      onClick={this.submitHandler}
      >
      login
      </button>
      <button className='google-log-in' onClick={signInWithGoogle}>Log in with Google</button>
      <p className="message">
      Not registered? <a href="/signup">Create an account</a>
      </p>
      </form>
      </div>
      </div>
      );
      
  }
  
}
export default LoginPage;
