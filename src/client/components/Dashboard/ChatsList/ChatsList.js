import React from 'react';
import moment from 'moment';

import './ChatsList.css';
import wrapDash from '../../../containers/WrapDash';
import ChatPeak from './ChatPeak/ChatPeak';

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
            this.props.allChats
              ? this.props.allChats.map((chat, i) => (
                  <div
                    key={i}
                    className="ChatsList-chat"
                    onClick={() => this.openChat(chat.id)}>
                    {
                      <ChatPeak
                        chat={chat}
                        determineChatHeader={this.props.determineChatHeader}
                        findUserName={this.props.findUserName}
                        userId={this.props.userId}
                      />
                    }
                  </div>
                ))
              : null
          }
      </div>
    )
  }
}

export default wrapDash(ChatsList);
