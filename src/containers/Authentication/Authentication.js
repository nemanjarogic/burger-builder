import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import { getErrorMessage } from "../../shared/firebaseErrorCodeMapper";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Authentication.module.css";

class Authentication extends Component {
  constructor(props) {
    super(props);

    const emailValidation = {
      isRequired: true,
      isEmail: true,
      validationMessage: "Please enter valid email format!"
    };

    const passwordValidation = {
      isRequired: true,
      minLength: 6,
      validationMessage: "Password must be at least 6 charachters long!"
    };

    this.state = {
      controls: {
        email: this.initInputProperty(
          "email",
          "Email Address",
          emailValidation
        ),
        password: this.initInputProperty(
          "password",
          "Password",
          passwordValidation
        )
      },
      isInRegisterMode: false
    };
  }

  initInputProperty = (
    elementType,
    placeholder,
    validation = {
      isRequired: true,
      validationMessage: "Please enter a value!"
    }
  ) => {
    return {
      elementType: "input",
      elementConfig: {
        type: elementType,
        placeholder: placeholder
      },
      value: "",
      validation: validation,
      isValid: false,
      isModifiedByUser: false
    };
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        isValid: this.checkInputValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        isModifiedByUser: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  checkInputValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.isRequired) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  submitHandler = event => {
    event.preventDefault();

    if (this.state.isInRegisterMode) {
      this.props.registerUser(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
      return;
    }

    this.props.signInUser(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isInRegisterMode: !prevState.isInRegisterMode };
    });
  };

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        isValid={formElement.config.isValid}
        validation={formElement.config.validation}
        isModifiedByUser={formElement.config.isModifiedByUser}
        inputChangedHandler={event =>
          this.inputChangedHandler(event, formElement.id)
        }
      />
    ));

    if (this.props.isLoading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{getErrorMessage(this.props.error.message)}</p>;
    }

    return (
      <div className={styles.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" clicked={this.submitOrderHandler}>
            {this.state.isInRegisterMode ? "REGISTER" : "SIGN IN"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isInRegisterMode ? "SIGN IN" : "REGISTER"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.authentication.isLoading,
    error: state.authentication.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (email, password) =>
      dispatch(actions.registerUser(email, password)),
    signInUser: (email, password) =>
      dispatch(actions.signInUser(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
