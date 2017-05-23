import React, Component from 'react';
import { connect } from 'react-redux';

import './Auth.css';

export default function(ComposedClass) {
  class AuthCheck extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        // route to login page
      }
    }

    render() {
      return <ComposedClass {...this.props} />
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.userAuth
    }
  }

  return connect(mapStateToProps)(AuthCheck);
}
