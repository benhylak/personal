import "./styles.css";
import WhatImDoing from "./WhatImDoing";
import { Component } from "react";

export default class HelloPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preparingToClose: false
    };
  }

  onMouseOver(event) {}

  onMouseOut(event) {}

  render() {
    var fadeAni = this.state.preparingToClose ? "HelloFadeOut" : "HelloFadeIn";
    var preFade = this.state.preparingToClose ? 0.2 : 1;

    return (
      <div
        className="MessagePage"
        style={{
          opacity: this.props.isVisible ? 1 : 0
        }}
      >
        <div
          style={{
            minHeight: "40px",

            overflow: "auto"
          }}
        >
          <h1>
            <div className={fadeAni} style={{ opacity: preFade }}>
              Hello!
            </div>
            <img
              onMouseOver={() => this.setState({ preparingToClose: true })}
              onMouseOut={() => this.setState({ preparingToClose: false })}
              onClick={() => this.props.onExit()}
              className="CloseButton"
              src="../close.png"
            />
          </h1>
          <div className={fadeAni} style={{ opacity: preFade }}>
            <h2 id="first">You should be seeing my website</h2>
            <h2>
              BUT I <WhatImDoing /> RIGHT NOW AND I DON’T HAVE TIME TO MAKE ONE.
            </h2>
            <h2 id="last">
              SOMEDAY, I’LL MAKE A REALLY GOOD ONE, AND PUT IT HERE.
            </h2>
          </div>
        </div>

        <div
          onClick={() => this.props.onExit()}
          style={{
            width: "100%",
            flex: "1"
          }}
        />
      </div>
    );
  }
}
