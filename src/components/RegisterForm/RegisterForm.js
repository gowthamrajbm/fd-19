import React from "react";
import { Link } from "react-router-dom";

import axios from "../../axios";
import * as formUtils from "../../utils/formUtils";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import DotLoader from "../UI/DotLoader/DotLoader";
import Aux from "../../hoc/Aux/Aux";

import "./RegisterForm.css";

class RegisterForm extends React.Component {
  state = {
    form: {
      eid: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Employee ID"
        },
        validation: {
          isNumber: true,
          maxLength: 6,
          minLength: 6
        },
        value: "",
        valid: false,
        shouldValidate: true,
        touched: false
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name"
        },
        validation: {
          required: true
        },
        value: "",
        valid: false,
        shouldValidate: true,
        touched: false
      }
    },
    formIsvalid: true,
    loading: false,
    status: null
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  submitHandler = event => {
    event.preventDefault();

    const eid = this.state.form.eid.value;
    const name = this.state.form.name.value;

    let registerParams = new URLSearchParams();
    registerParams.append("eid", eid);
    registerParams.append("name", name);

    this.setState({ loading: true });

    axios
      .post(
        "/employee/register?eid" + "=" + eid + "&name=" + name,
        registerParams
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            status: {
              type: "Success",
              msg: "Registered"
            }
          });
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
            msg: "error"
          }
        });
      });
  };

  inputHandler = (event, id, form) => {
    const updatedState = formUtils.inputChangedHandler(event, id, form);
    this.setState(updatedState);
  };

  render() {
    let error = this.state.status ? (
      <p className="Error-Msg">{this.state.status.msg}</p>
    ) : (
      <p />
    );

    let footer = (
      <div className="MAF-Footer">
        <Button
          btntype="Classic Round"
          type="submit"
          disabled={this.state.formIsvalid}
        >
          REGISTER
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

    if (this.props.loading) {
      form = <DotLoader />;
    }

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

export default RegisterForm;
