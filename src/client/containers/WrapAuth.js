import React from 'react';
import { connect } from 'react-redux';
import { userLogin, userSignUp } from '../state/actions/userActions';
import { loginError, signupError } from '../state/actions/errorActions';

export default function(ComposedClass) {
  class WrapAuth extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  function mapStateToProps(state) {
    return {
      errors: state.errors
    }
  }

  return connect(mapStateToProps, {
    userLogin,
    userSignUp,
    signupError,
    loginError
  })(WrapAuth);
}
