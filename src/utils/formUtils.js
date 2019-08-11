import React from "react";
import Input from "../components/UI/Input/Input";

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) return true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isNumber) {
    isValid = !isNaN(value.trim());
  }

  if (rules.isEmail) {
    isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value.trim()
    );
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

export const formStatus = (status, statusMsg) => {
  let statusBox = null;
  const statusClassMap = { error: "Error-Msg", success: "Success-Msg" };

  if (status) {
    statusBox = <p className={statusClassMap[status]}>{statusMsg}</p>;
  }

  return statusBox;
};

export const inputChangedHandler = (event, id, form) => {
  const updatedDetailsForm = {
    ...form
  };
  const updatedFormElement = {
    ...updatedDetailsForm[id]
  };

  updatedFormElement.value =
    event.target.value === false ? event.target.checked : event.target.value;

  updatedFormElement.value =
    updatedFormElement.elementConfig.type === "file"
      ? event.target.files[0]
      : updatedFormElement.value;

  updatedFormElement.valid = checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation
  );
  updatedFormElement.touched = true;
  updatedDetailsForm[id] = updatedFormElement;

  let formValid = true;
  for (let id in updatedDetailsForm) {
    formValid = updatedDetailsForm[id].valid && formValid;
  }
  return { form: updatedDetailsForm, formIsvalid: formValid };
};

export const build = (
  formSchema,
  error,
  submitHandler,
  inputHandler,
  footer,
  type = "Inline"
) => {
  const formElementsArray = [];
  for (let key in formSchema) {
    formElementsArray.push({
      id: key,
      config: formSchema[key]
    });
  }
  //console.log(formSchema);
  let form = (
    <form onSubmit={e => submitHandler(e)}>
      {error}
      {formElementsArray.map(formElement => (
        <div key={formElement.id}>
          <Input
            elementType={formElement.config["elementType"]}
            elementConfig={formElement.config["elementConfig"]}
            value={formElement.config["value"]}
            valid={formElement.config["valid"]}
            shouldValidate={formElement.config.validation}
            touched={formElement.config["touched"]}
            changed={event => inputHandler(event, formElement.id, formSchema)}
            variant={type}
          />
          {formElement.config["valid"]}
        </div>
      ))}
      {footer}
    </form>
  );

  return form;
};
