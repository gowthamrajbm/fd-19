import React from "react";
import "./PrizeForm.css";
import Button from "../UI/Button/Button";
import axios from "../../axios";

class PrizeForm extends React.Component {
  state = {
    submitted: false,
    draw1: "",
    draw2: "",
    draw3: "",
    eid: this.props.eid
  };

  prizeSubmit = e => {
    this.setState({ submitted: true });
    axios
      .post(
        "/employee/checkPrize?draw1=" +
          this.state.draw1 +
          "&draw2=" +
          this.state.draw2 +
          "&draw3=" +
          this.state.draw3 +
          "&eid=" +
          this.state.eid
      )
      .then(res => {
        this.props.won();
      })
      .catch(err => {
        this.props.lost();
      });
  };

  render() {
    return (
      <div>
        {!this.state.submitted ? (
          <div class="text-cont">
            <input
              type="text"
              onChange={e => this.setState({ draw1: e.target.value })}
            />
            <input
              type="text"
              onChange={e => this.setState({ draw2: e.target.value })}
            />
            <input
              type="text"
              onChange={e => this.setState({ draw3: e.target.value })}
            />
          </div>
        ) : (
          <div class="loader-wrapper loader-wrapper--9">
            <div class="loader loader--9">
              <div class="square">
                <b>{this.state.draw1}</b>
              </div>
              <div class="square">
                <b>{this.state.draw2}</b>
              </div>
              <div class="square">
                <b>{this.state.draw3}</b>
              </div>
            </div>
          </div>
        )}

        <Button btntype="Classic Round" clicked={e => this.prizeSubmit(e)}>
          Submit
        </Button>
      </div>
    );
  }
}

export default PrizeForm;
