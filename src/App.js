import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contact/Contact";
import Chefs from "./Pages/Chefs/Chefs";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Howitworks from "./Pages/HowItWorks/Howitworks";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Profile from "./Pages/Profile/Profile";
const App = () => {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={Homepage} />
            <Route path="/howitworks" component={Howitworks} />
            <Route path="/chefs" component={Chefs} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" render={() => <Redirect to="/login" />} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
