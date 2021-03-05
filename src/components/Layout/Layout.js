import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import classes from './layout.css';

const layout = (props) => (
  <Auxiliary>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxiliary>
);

export default layout;
