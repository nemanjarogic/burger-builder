import React, { Component, Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    isSideDrawerVisible: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ isSideDrawerVisible: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({
      isSideDrawerVisible: !prevState.isSideDrawerVisible
    }));
  };

  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isSideDrawerVisible={this.state.isSideDrawerVisible}
          closeHandler={this.sideDrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
