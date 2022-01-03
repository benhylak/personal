import "./styles.css";
import Canvas from "./canvas";
import { Component } from "react";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  onMouseOver(event) {
    this.props.setIsHovered(true);
  }

  onMouseOut(event) {
    this.props.setIsHovered(false);
  }

  render() {
    var hoverStyle = "";
    if (this.props.siblingIsHovered) {
      hoverStyle = " CanvasMenuItemNotHovered";
    }

    return (
      <p
        onClick={this.props.onClick}
        onTouchStart={this.props.onClick}
        id={this.props.id}
        onMouseOver={(e) => this.onMouseOver(e)}
        onMouseOut={(e) => this.onMouseOut(e)}
        className={"CanvasMenuItem" + hoverStyle}
      >
        {this.props.text}
      </p>
    );
  }
}
