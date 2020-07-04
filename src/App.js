import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Howitworks from "./Pages/Howitworks";
import Navbar from "./Components/Navbar/Navbar";
const App = () => {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={About} />
            <Route path="/howitworks" component={Howitworks} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
