import "./styles.css";
import Canvas from "./canvas";
import MenuItem from "./MenuItem";
import HelloPage from "./HelloPage";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredElement: null,
      showMessage: false
    };
  }

  setIsHovered(isHovered) {
    this.setState({ anyIsHovered: isHovered });
  }

  onHelloExit() {
    this.setState({ showMessage: false });
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100vh" }} className="App">
        <img
          style={{ opacity: this.state.showMessage ? 0 : 1 }}
          className="Logo"
          src="../logo.png"
        />

        <Canvas className="Canvas"></Canvas>

        <HelloPage
          isVisible={this.state.showMessage}
          onExit={this.onHelloExit.bind(this)}
        />

        <div className="CanvasMenu" style={{ color: "white" }}>
          <MenuItem
            setIsHovered={this.setIsHovered.bind(this)}
            id="item1"
            text=" what's this?"
            siblingIsHovered={this.state.anyIsHovered}
            onClick={() => this.setState({ showMessage: true })}
          />

          <MenuItem
            setIsHovered={this.setIsHovered.bind(this)}
            id="item2"
            text="contact"
            siblingIsHovered={this.state.anyIsHovered}
          />

          <MenuItem
            setIsHovered={this.setIsHovered.bind(this)}
            id="item3"
            text="archive"
            siblingIsHovered={this.state.anyIsHovered}
          />
        </div>
      </div>
    );
  }
}
