import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Modal.module.css";

const Modal = props => (
  <Fragment>
    <Backdrop
      isBackdropActive={props.isModalVisible}
      clicked={props.closeModalHandler}
    />
    <div
      className={styles.Modal}
      style={{
        transform: props.isModalVisible
          ? "translateY(0)"
          : "translateY(-100vh)",
        opacity: props.isModalVisible ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Fragment>
);

export default Modal;
