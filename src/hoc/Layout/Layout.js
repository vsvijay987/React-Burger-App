import React, { useState } from "react";
import { connect } from "react-redux";

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSidedrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSidedrawer(!showSidedrawer);
  };

  return (
    <Auxiliary>
      <SideDrawer
        open={showSidedrawer}
        close={sideDrawerClosedHandler}
        isAuthenticate={props.isAuth}
      />
      <Toolbar
        toggleSideDrawer={sideDrawerToggleHandler}
        isAuthenticate={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId != null,
  };
};
export default connect(mapStateToProps)(layout);
