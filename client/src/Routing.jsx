import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CarBrowse from "./components/CarBrowse/CarBrowse";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={CarBrowse} />
        <Route path="/newCar" component={CarBrowse} />
      </Switch>
    );
  }
}
export default Routing;
