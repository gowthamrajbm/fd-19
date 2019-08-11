import React from "react";
import "./Register.css";

import Button from "../../components/UI/Button/Button";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

class Register extends React.Component {
  state = {
    page: 1
  };

  setPage = page => {
    this.setState({ page: page });
  };

  render() {
    return (
      <div className="Page-Cont">
        <div className="Register-Cont">
          <h1>Register</h1>
          <RegisterForm />
        </div>
      </div>
    );
  }
}
export default Register;
