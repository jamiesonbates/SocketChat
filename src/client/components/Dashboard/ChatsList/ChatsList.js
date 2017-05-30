import React from 'react';

import './ChatsList.css';
import wrapDash from '../../../containers/WrapDash';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
  }

  openChat(id) {
    this.props.dispatch(this.props.setChat(id));
  }

  componentWillReceiveProps(props) {
    console.log(props.allChats);
  }

  render() {
    return (
      <div className="ChatsList-container">
        <div className="ChatsList-header">
          <h2>ChatsList</h2>
        </div>
          {
            this.props.allChats
              ? this.props.allChats.map((chat, i) => (
                  <div
                    key={i}
                    className="ChatsList-chat"
                    onClick={() => this.openChat(chat.id)}>
                    <p>{chat.name}</p>
                  </div>
                ))
              : null
          }
      </div>
    )
  }
}

export default wrapDash(ChatsList);
