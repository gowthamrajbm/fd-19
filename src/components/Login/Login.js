import React from "react";
import { Link } from "react-router-dom";

import axios from "../../axios";
import * as formUtils from "../../utils/formUtils";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import DotLoader from "../UI/DotLoader/DotLoader";
import Aux from "../../hoc/Aux/Aux";

import "./Login.css";

class Login extends React.Component {
  state = {
    form: {
      eid: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Employee ID"
        },
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        value: "",
        valid: false,
        shouldValidate: true,
        touched: false
      }
    },
    formIsvalid: false,
    loading: false,
    status: null
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  submitHandler = event => {
    event.preventDefault();
    const eid = this.state.form.eid.value;

    let loginParams = new URLSearchParams();
    loginParams.append("eid", eid);

    this.setState({ loading: true });

    axios
      .post("/employee/login?eid=" + eid, loginParams)
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false
          });
          this.props.success(3, eid);
        } else {
          this.setState({
            loading: false,
            status: {
              type: "Error",
              msg: res.data.response
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          status: {
            type: "Error",
            msg: "Unknown Error"
          }
        });
      });
  };

  inputHandler = (event, id, form) => {
    const updatedState = formUtils.inputChangedHandler(event, id, form);
    this.setState(updatedState);
  };

  render() {
    const error = this.state.status ? (
      <p className="Error-Msg">{this.state.status.msg}</p>
    ) : (
      <p />
    );

    let footer = (
      <div className="MAF-Footer">
        <Button
          btntype="Classic Round"
          type="submit"
          disabled={!this.state.formIsvalid}
        >
          Register
        </Button>
      </div>
    );

    let form = formUtils.build(
      this.state.form,
      error,
      this.submitHandler,
      this.inputHandler,
      footer
    );

    return !this.state.loading ? (
      <Aux>
        <div className="MA-Settings">
          <div className="MA-Form">{form}</div>
        </div>
      </Aux>
    ) : (
      <DotLoader />
    );
  }
}

export default Login;
