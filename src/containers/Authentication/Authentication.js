import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { updateObject } from "../../shared/utility";
import { getErrorMessage } from "../../shared/firebaseErrorCodeMapper";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  checkInputValidity,
  getEmailValidationRules,
  getPasswordValidationRules
} from "../../shared/validation";

import styles from "./Authentication.module.css";

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: {
        email: this.initInputProperty(
          "email",
          "Email Address",
          getEmailValidationRules()
        ),
        password: this.initInputProperty(
          "password",
          "Password",
          getPasswordValidationRules()
        )
      },
      isInRegisterMode: false
    };
  }

  componentDidMount() {
    if (
      !this.props.isBurgerBuildingStarted &&
      this.props.authRedirectPath !== "/"
    ) {
      this.props.setAuthRedirectPath();
    }
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
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        isValid: checkInputValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        isModifiedByUser: true
      })
    });

    // Old way how can we update controls without updateObject utility function
    /*const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        isValid: checkInputValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        isModifiedByUser: true
      }
    };*/

    this.setState({ controls: updatedControls });
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

    let authRedirect = null;
    if (this.props.isUserAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
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
    error: state.authentication.error,
    isUserAuthenticated: state.authentication.token !== null,
    isBurgerBuildingStarted: state.burgerBuilder.isBurgerBuildingStarted,
    authRedirectPath: state.authentication.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (email, password) =>
      dispatch(actions.registerUser(email, password)),
    signInUser: (email, password) =>
      dispatch(actions.signInUser(email, password)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
