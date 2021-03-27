import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxiliary>
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerClosedHandler}
          isAuthenticate={this.props.isAuth}
        />
        <Toolbar
          toggleSideDrawer={this.sideDrawerToggleHandler}
          isAuthenticate={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId != null,
  };
};
export default connect(mapStateToProps)(layout);
