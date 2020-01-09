import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isUserAuthenticated={this.props.isUserAuthenticated}
        />
        <SideDrawer
          isSideDrawerVisible={this.state.isSideDrawerVisible}
          closeHandler={this.sideDrawerClosedHandler}
          isUserAuthenticated={this.props.isUserAuthenticated}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.authentication.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
