import React from 'react'

import './SingleChat.css';
import wrapDash from '../../../containers/WrapDash';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    console.log('more props', props);
  }

  render() {
    return (
      <div className="SingleChat-container">
        <h2>SingleChat</h2>

        {
          this.props.singleChat ?
            this.props.singleChat.messages.map((message, i) => (
              <p key={i}>{message.message}</p>
            ))
            : null
        }
      </div>
    )
  }
}

export default wrapDash(SingleChat);
