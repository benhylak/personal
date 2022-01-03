import React, { useRef, Component } from "react";
import "./styles.css";

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function rgb(r, g, b) {
  return ["rgb(", r, ",", g, ",", b, ")"].join("");
}

function lerpColor(a, b, amount) {
  const ar = a >> 16,
    ag = (a >> 8) & 0xff,
    ab = a & 0xff,
    br = b >> 16,
    bg = (b >> 8) & 0xff,
    bb = b & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return (rr << 16) + (rg << 8) + (rb | 0);
}

class Canvas extends Component {
  canvasRef = React.createRef();
  ctx = null;

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      xSmoothed: 0,
      ySmoothed: 0
    };
  }

  startAnimation() {
    let timer = requestAnimationFrame(this.draw.bind(this));
  }

  onMouseMove(e) {}

  draw(timestamp) {
    const ctx = this.ctx;

    const frameCount = timestamp;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.fillStyle = "#000000";

    // Define the points as {x, y}
    var start = { x: 50, y: 270 };
    var cp1 = { x: 130, y: 230 };
    var cp2 = { x: 40, y: 120 };
    var end = { x: 280, y: 150 };

    var timeFade = Math.pow(
      Math.min(1, Math.max(timestamp - 300, 0) / 2400),
      0.2
    );
    start.x += map_range(Math.cos(frameCount * 0.00016), -1, 1, -10, 20);

    start.x -= lerp(30, 0, timeFade);

    end.y += map_range(
      Math.sin(frameCount * 0.0003 * lerp(5, 1, timeFade)),
      -1,
      1,
      -3,
      14
    );

    end.y -= lerp(30, 0, timeFade);

    cp1.x += map_range(
      Math.sin(frameCount * 0.00015 * lerp(10, 1, timeFade)),
      -1,
      1,
      -5,
      19
    );

    cp2.y +=
      (50 *
        lerp(-0.8, 1, timeFade) *
        (Math.cos(frameCount * 0.0003 * lerp(3, 1, timeFade)) + 0.5)) /
      1.5;
    cp2.x +=
      (30 *
        lerp(30, 1, timeFade) *
        (Math.sin(frameCount * 0.00025 * lerp(3, 1, timeFade) + 5) + 0.9)) /
      1.5;

    this.state.xSmoothed = lerp(this.state.xSmoothed, this.state.x, 0.05);
    this.state.ySmoothed = lerp(this.state.ySmoothed, this.state.y, 0.05);

    // var point = { x: this.state.xSmoothed, y: this.state.ySmoothed };

    //point.x -= 1220;
    // point.y -= 480;
    var fade = lerp(255, 0, (timeFade - 0.2) / 0.8); // lerp(255, 0, );

    ctx.fillStyle = rgb(fade, fade, fade);

    //cp1.x = lerp(cp1.x, this.state.x, 0.05);
    //cp1.y = lerp(cp1.y, this.state.y, 0.05);
    //cp2.x = lerp(cp2.x, this.state.x, 0.05);
    //cp2.y = lerp(cp2.y, this.state.y, 0.05);
    //cp1.x = lerp(cp1.x
    // Cubic Bézier curve
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.lineTo(end.x, start.y);
    ctx.lineTo(start.x, start.y);
    ctx.fill();

    requestAnimationFrame(this.draw.bind(this));
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 270;

    window.addEventListener("mousemove", (e) => {
      this.setState({ x: e.screenX, y: e.screenY });
    });

    this.startAnimation();
  }

  render() {
    return <canvas ref={this.canvasRef} {...this.props} />;
    //
  }
}

export default Canvas;
