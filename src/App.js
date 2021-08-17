import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Template from "./components/Template";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/template">
            <Template/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/">
            <SignIn/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
