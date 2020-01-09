import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

const NavigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger
    </NavigationItem>

    {props.isUserAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}

    {props.isUserAuthenticated ? (
      <NavigationItem link="/signout">Sign Out</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Sign In</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
