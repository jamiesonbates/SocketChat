import React from 'react';
import { connect } from 'react-redux';

import './ChatsList.css';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
  }
  openChat(id) {
    this.props.dispatch(this.props.setChat(id));
  }

  render() {
    return (
      <div className="ChatsList-container">
        <div className="ChatsList-header">
          <h2>ChatsList</h2>
        </div>
          {
            this.props.chats
              ? this.props.chats.map((chat, i) => (
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

const mapStateToProps = function(state) {
  return {

  }
}

export default connect(mapStateToProps)(ChatsList);
