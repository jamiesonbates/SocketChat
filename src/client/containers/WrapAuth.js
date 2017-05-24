import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../state/actions/userActions';
import { loginError } from '../state/actions/errorActions';

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
    loginError
  })(WrapAuth);
}
