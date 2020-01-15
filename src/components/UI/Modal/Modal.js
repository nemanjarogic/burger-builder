import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Modal.module.css";

const Modal = ({ isModalVisible, closeModalHandler, children }) => {
  return (
    <Fragment>
      <Backdrop isBackdropActive={isModalVisible} clicked={closeModalHandler} />
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
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.isModalVisible === prevProps.isModalVisible &&
    nextProps.children === prevProps.children
  );
});
