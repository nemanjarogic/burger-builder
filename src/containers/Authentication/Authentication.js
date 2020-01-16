import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
} from "../../shared/form/formValidation";
import { initInputProperty } from "../../shared/form/formInitialization";

import styles from "./Authentication.module.css";

const Authentication = () => {
  const [isInRegisterMode, setIsInRegisterMode] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: initInputProperty(
      "email",
      "Email Address",
      getEmailValidationRules()
    ),
    password: initInputProperty(
      "password",
      "Password",
      getPasswordValidationRules()
    )
  });

  const {
    isLoading,
    error,
    isUserAuthenticated,
    isBurgerBuildingStarted,
    authRedirectPath
  } = useSelector(
    state => ({
      isLoading: state.authentication.isLoading,
      error: state.authentication.error,
      isUserAuthenticated: state.authentication.token !== null,
      isBurgerBuildingStarted: state.burgerBuilder.isBurgerBuildingStarted,
      authRedirectPath: state.authentication.authRedirectPath
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const setAuthRedirectPath = useCallback(() => {
    if (!isBurgerBuildingStarted && authRedirectPath !== "/") {
      dispatch(actions.setAuthRedirectPath("/"));
    }
  }, [dispatch, isBurgerBuildingStarted, authRedirectPath]);

  useEffect(() => {
    setAuthRedirectPath();
  }, [setAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        isValid: checkInputValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        isModifiedByUser: true
      })
    });

    // Old way how can we update controls without updateObject utility function
    // const updatedControls = {
    //   ...authForm,
    //   [controlName]: {
    //     ...authForm[controlName],
    //     value: event.target.value,
    //     isValid: checkInputValidity(
    //       event.target.value,
    //       authForm[controlName].validation
    //     ),
    //     isModifiedByUser: true
    //   }
    // };

    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (isInRegisterMode) {
      dispatch(
        actions.registerUser(authForm.email.value, authForm.password.value)
      );
      return;
    }

    dispatch(actions.signInUser(authForm.email.value, authForm.password.value));
  };

  const switchAuthModeHandler = () => {
    setIsInRegisterMode(!isInRegisterMode);
  };

  const formElements = [];
  for (let key in authForm) {
    formElements.push({
      id: key,
      config: authForm[key]
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
      inputChangedHandler={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (isLoading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{getErrorMessage(error.message)}</p>;
  }

  let authRedirect = null;
  if (isUserAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">
          {isInRegisterMode ? "REGISTER" : "SIGN IN"}
        </Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isInRegisterMode ? "SIGN IN" : "REGISTER"}
      </Button>
    </div>
  );
};

export default Authentication;
