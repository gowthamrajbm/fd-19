import React, { Component } from "react";

import Aux from "../Aux/Aux";
import "./HomeLayout.css";
class HomeLayout extends Component {
  state = {};

  render() {
    const layout = <div className="Page">{this.props.children}</div>;
    return <Aux>{layout}</Aux>;
  }
}

export default HomeLayout;
