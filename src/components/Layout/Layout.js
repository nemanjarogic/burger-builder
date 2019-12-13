import React, { Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";

const Layout = props => (
  <Fragment>
    <Toolbar />
    <main className={styles.Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
