import "./styles.css";

import { Component } from "react";

export default class WhatImDoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hasBeenHovered: false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver(event) {
    this.setState({ hovered: true, hasBeenHovered: true });
  }

  onMouseOut(event) {
    this.setState({ hovered: false });
  }

  render() {
    var shouldPulse = this.state.hasBeenHovered ? "" : " PulseAnimate";
    return (
      <div className="WhatImDoingContainer">
        <h3
          onMouseOut={this.onMouseOut}
          onMouseOver={this.onMouseOver}
          onClick={(e) => e.stopPropagation()}
          className={"highlight" + shouldPulse}
        >
          {this.state.hovered ? "DESIGN @ APPLE" : "WORK A LOT"}
        </h3>
      </div>
    );
  }
}
