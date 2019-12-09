import React from "react";
import Aux from "../../hoc/Aux";

const Layout = props => (
  <Aux>
    <div>Toolbaar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default Layout;
