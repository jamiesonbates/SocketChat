import React from 'react';
import moment from 'moment';

import './ChatsList.css';
import wrapDash from '../../../containers/WrapDash';
import LastMessage from './LastMessage';

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
                        <div>
                          <div>
                            <p>{this.props.determineChatHeader(chat)}</p>

                            <LastMessage messages={chat.messages} />
                          </div>
                        </div>
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
