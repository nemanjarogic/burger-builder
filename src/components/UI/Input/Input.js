import React from "react";
import styles from "./Input.module.css";

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={styles.InputElement}
          value={props.value}
          onChange={props.inputChangedHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={styles.InputElement}
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
          className={styles.InputElement}
          value={props.value}
          onChange={props.inputChangedHandler}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
