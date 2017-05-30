import React from 'react';
import { connect } from 'react-redux';

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

    function mapStateToProps(state) {
      return {

      }
    }

    return connect(mapStateToProps)(WrapDash);
  }
}
