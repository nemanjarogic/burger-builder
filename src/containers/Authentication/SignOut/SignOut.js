import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";

class SignOut extends Component {
  componentDidMount() {
    this.props.signOutUser();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(actions.signOutUser())
  };
};

export default connect(null, mapDispatchToProps)(SignOut);
