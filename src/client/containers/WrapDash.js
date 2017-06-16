import React from 'react';
import { connect } from 'react-redux';

import { updateMain, updateSide } from '../state/actions/dashControlActions';

export default function(ComposedClass) {
  class WrapDash extends React.Component {
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
      dashControls: state.dashControls
    }
  }

  return connect(mapStateToProps)(WrapDash);
}
