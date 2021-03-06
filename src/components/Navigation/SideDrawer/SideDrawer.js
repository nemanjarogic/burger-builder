import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import styles from "./SideDrawer.module.css";

const SideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.isSideDrawerVisible) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }

  return (
    <Fragment>
      <Backdrop
        isBackdropActive={props.isSideDrawerVisible}
        clicked={props.closeHandler}
      />
      <div className={attachedClasses.join(" ")} onClick={props.closeHandler}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isUserAuthenticated={props.isUserAuthenticated} />
        </nav>
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  isSideDrawerVisible: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired
};

export default SideDrawer;
