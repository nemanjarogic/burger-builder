import React from "react";
import styles from "./Input.module.css";

const Input = props => {
  let inputElement = null;
  let validationError = null;
  const inputStyleClasses = [styles.InputElement];

  if (!props.isValid && props.validation && props.isModifiedByUser) {
    inputStyleClasses.push(styles.Invalid);
    validationError = (
      <p className={styles.ValidationError}>
        {props.validation.validationMessage}
      </p>
    );
  }

  switch (props.elementType) {
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputStyleClasses.join(" ")}
          value={props.value}
          onChange={props.inputChangedHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputStyleClasses.join(" ")}
          value={props.value}
          onChange={props.inputChangedHandler}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "input":
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputStyleClasses.join(" ")}
          value={props.value}
          onChange={props.inputChangedHandler}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
