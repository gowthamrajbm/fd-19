import React from "react";
import "./PrizeForm.css";
import Button from "../UI/Button/Button";
import axios from "../../axios";

class PrizeForm extends React.Component {
  state = {
    submitted: false,
    draw1: "",
    draw2: "",
    draw3: ""
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
          this.props.eid()
      )
      .then(res => {
        console.log(res);
        if (res.data.success) this.props.won();
        else this.props.lost();
      })
      .catch(err => {
        this.props.lost();
      });
  };

  render() {
    return (
      <div>
        <h3>
          Spin the lucky wheel <br /> and win a Prize
        </h3>
        {!this.state.submitted ? (
          <div className="text-cont">
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
          <div className="loader-wrapper loader-wrapper--9">
            <div className="loader loader--9">
              <div className="square">
                <b>{this.state.draw1}</b>
              </div>
              <div className="square">
                <b>{this.state.draw2}</b>
              </div>
              <div className="square">
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
