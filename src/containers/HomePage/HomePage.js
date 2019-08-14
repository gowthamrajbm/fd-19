import React from "react";
import "./HomePage.css";

import Button from "../../components/UI/Button/Button";
import Login from "../../components/Login/Login";
import PrizeForm from "../../components/PrizeForm/PrizeForm";

class HomePage extends React.Component {
  state = {
    page: 1,
    prize: null,
    eid: null,
    name: null
  };

  setPage = (page, eid = null, name = null) => {
    this.setState({ page: page, eid: eid, name: name });
  };

  getEid = () => {
    return this.state.eid;
  };

  won = prize => {
    this.setState({ page: 5, prize: prize });
  };

  lost = prize => {
    this.setState({ page: 6 });
  };

  render() {
    return (
      <div className="Page-Cont">
        <div
          className={this.state.page === 1 ? "Home-Intro active" : "Home-Intro"}
        >
          <div className="Page1">
            <img
              src="https://markit.anz.com/uploads/144a4930128bca0c8536347ebb94701c/logo/small-logo-eb6fb5f143638db1e2b8e68eec525356.png"
              alt="ANZ"
            />
            <h1>
              ANZ Finance Day
              <br />
              2019
            </h1>
            <Button
              btntype="Classic Round"
              clicked={() => this.setState({ page: 2 })}
            >
              Check-In
            </Button>
          </div>
        </div>
        <div
          className={
            this.state.page === 2 ? "Home-Register active" : "Home-Register"
          }
        >
          <div className="Page2">
            <h1>Employee Check-In</h1>
            <Login success={this.setPage} />
          </div>
        </div>
        <div
          className={
            this.state.page === 3 ? "Home-Success active" : "Home-Success"
          }
        >
          <div className="Page3">
            <h1>{this.state.name ? "Welcome " + this.state.name : ""}</h1>
            <h3 style={{ fontWeight: "normal" }}>Kindly collect your Gift</h3>
            <Button
              btntype="Classic-i Round"
              clicked={() => this.setState({ page: 4 })}
            >
              Got It!
            </Button>
          </div>
        </div>
        <div
          className={this.state.page === 4 ? "Home-Prize active" : "Home-Prize"}
        >
          <div className="Page4">
            <PrizeForm eid={this.getEid} won={this.won} lost={this.lost} />
          </div>
        </div>
        <div
          className={
            this.state.page === 5
              ? "Home-Prize-Success active"
              : "Home-Prize-Success"
          }
        >
          <div className="Page5">
            <h1>YaY!!</h1>
            <h3>You've Won a </h3>
            <h1>PRIZE</h1>
          </div>
        </div>
        <div
          className={
            this.state.page === 6 ? "Home-Prize-Fail active" : "Home-Prize-Fail"
          }
        >
          <div className="Page6">
            <h1>Sorry!!</h1>
            <h3>
              Better luck at
              <br />
              Next Stall
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Confetti particle class
 */
class ConfettiParticle {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.color = "";
    this.lightness = 70;
    this.diameter = 0;
    this.tilt = 0;
    this.tiltAngleIncrement = 0;
    this.tiltAngle = 0;
    this.particleSpeed = 1.5;
    this.waveAngle = 0;
    this.x = 0;
    this.y = 0;
    this.reset();
  }

  reset() {
    this.lightness = 50;
    this.color = Math.floor(Math.random() * 360);
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height - this.height;
    this.diameter = Math.random() * 6;
    this.tilt = 0;
    this.tiltAngleIncrement = Math.random() * 0.1 + 0.04;
    this.tiltAngle = 0;
  }

  darken() {
    if (this.y < 100 || this.lightness <= 0) return;
    this.lightness -= 250 / this.height;
  }

  update() {
    this.waveAngle += this.tiltAngleIncrement;
    this.tiltAngle += this.tiltAngleIncrement;
    this.tilt = Math.sin(this.tiltAngle) * 12;
    this.x += Math.sin(this.waveAngle);
    this.y +=
      (Math.cos(this.waveAngle) + this.diameter + this.particleSpeed) * 0.4;
    if (this.complete()) this.reset();
    this.darken();
  }

  complete() {
    return this.y > this.height + 20;
  }

  draw() {
    let x = this.x + this.tilt;
    this.context.beginPath();
    this.context.lineWidth = this.diameter;
    this.context.strokeStyle =
      "hsl(" + this.color + ", 50%, " + this.lightness + "%)";
    this.context.moveTo(x + this.diameter / 2, this.y);
    this.context.lineTo(x, this.y + this.tilt + this.diameter / 2);
    this.context.stroke();
  }
}
/**
 * Setup
 */
(function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];

  // particle canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.id = "particle-canvas";
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  // change body bg color
  /*const changeBgColor = () => {
    const hue = Math.floor(Math.random() * 360);
    document.body.style.backgroundColor = "hsl(" + hue + ", 50%, 5%)";
  };*/

  // update canvas size
  const updateSize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  // create confetti particles
  const createParticles = () => {
    particles = [];
    let total = 100;

    if (width > 1080) {
      total = 400;
    } else if (width > 760) {
      total = 300;
    } else if (width > 520) {
      total = 200;
    }

    for (let i = 0; i < total; ++i) {
      particles.push(new ConfettiParticle(context, width, height));
    }
  };

  // animation loop function
  const animationFunc = () => {
    requestAnimationFrame(animationFunc);
    //if (Math.random() > 0.98) changeBgColor();
    context.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.width = width;
      p.height = height;
      p.update();
      p.draw();
    }
  };

  // on resize
  window.addEventListener("resize", e => {
    updateSize();
    createParticles();
  });

  // start
  updateSize();
  createParticles();
  //changeBgColor();
  animationFunc();
})();

export default HomePage;
