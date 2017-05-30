import React from 'react'

import './SingleChat.css';
import wrapDash from '../../../containers/WrapDash';

class SingleChat extends React.Component {
  render() {
    return (
      <div className="SingleChat-container">
        <h2>SingleChat</h2>
      </div>
    )
  }
}

export default wrapDash(SingleChat);
