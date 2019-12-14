import React, { Component, Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isModalVisible !== this.props.isModalVisible;
  }

  render() {
    const { isModalVisible, closeModalHandler, children } = this.props;

    return (
      <Fragment>
        <Backdrop
          isBackdropActive={isModalVisible}
          clicked={closeModalHandler}
        />
        <div
          className={styles.Modal}
          style={{
            transform: isModalVisible ? "translateY(0)" : "translateY(-100vh)",
            opacity: isModalVisible ? "1" : "0"
          }}
        >
          {children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
