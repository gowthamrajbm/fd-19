import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./containers/HomePage/HomePage";
import Register from "./containers/Register/Register";
import HomeLayout from "./hoc/HomeLayout/HomeLayout";

import "./App.css";

class App extends Component {
  render() {
    let routes = "";
    routes = (
      <HomeLayout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </HomeLayout>
    );

    return <BrowserRouter>{routes}</BrowserRouter>;
  }
}

export default App;
