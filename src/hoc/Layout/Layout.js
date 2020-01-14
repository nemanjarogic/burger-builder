import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import styles from "./Layout.module.css";

const Layout = props => {
  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible);
  };

  return (
    <Fragment>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isUserAuthenticated={props.isUserAuthenticated}
      />
      <SideDrawer
        isSideDrawerVisible={isSideDrawerVisible}
        closeHandler={sideDrawerClosedHandler}
        isUserAuthenticated={props.isUserAuthenticated}
      />
      <main className={styles.Content}>{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.authentication.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
