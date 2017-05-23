import React from 'react';
import { connect } from 'react-redux';

import { userAuth } from '../../actions/userActions';

export default function(ComposedClass) {
  class AuthCheck extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.props.dispatch(userAuth());

      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.userAuth
    }
  }

  return connect(mapStateToProps)(AuthCheck);
}
