import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar/Navbar";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
