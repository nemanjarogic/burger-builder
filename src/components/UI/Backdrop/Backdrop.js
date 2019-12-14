import React from "react";
import PropTypes from "prop-types";
import styles from "./Backdrop.module.css";

const Backdrop = props =>
  props.isBackdropActive ? (
    <div className={styles.Backdrop} onClick={props.clicked}></div>
  ) : null;

Backdrop.propTypes = {
  isBackdropActive: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
