import React from 'react';
import { connect } from 'react-redux';

import { userAuth } from '../state/actions/userActions';

export default function(ComposedClass) {
  class AuthCheck extends React.Component {
    constructor() {
      super();
    }

    componentWillMount() {
      this.checkAuth(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth(props) {
      if (!props.isAuthenticated) {
        console.log('dispatch userAuth');
        this.props.dispatch(userAuth());
      }
    }

    render() {
      return (
        <div>
          {
            this.props.isAuthenticated === true
              ? <ComposedClass {...this.props} />
              : null
          }
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.userInfo.userAuth
    }
  }

  return connect(mapStateToProps)(AuthCheck);
}
