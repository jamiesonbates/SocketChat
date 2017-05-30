import React from 'react';
import moment from 'moment';

import './ChatsList.css';
import wrapDash from '../../../containers/WrapDash';

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
                      chat.name ?
                        <div>
                          <div>
                            <p>{chat.name}</p>
                            {
                              <p className="ChatsList-last-message">
                                {chat.messages[chat.messages.length - 1].message}
                              </p>
                            }
                          </div>

                          <div>
                            {
                              <p>
                                {
                                  this.props.msgTimeFromNow(chat.messages[chat.messages.length - 1].created_at)
                                }
                              </p>
                            }
                          </div>
                        </div>
                      :
                        <div>
                          <div>
                            {
                              chat.users.map((user, i) => (
                                <span key={i}>
                                  {user.first_name} {user.last_name}
                                  {
                                    i !== chat.users.length - 1 ?
                                    <span>, </span>
                                    : null
                                  }
                                </span>
                              ))
                            }

                            {
                              <p className="ChatsList-last-message">
                                {chat.messages[chat.messages.length - 1].message}
                              </p>
                            }
                          </div>

                          <div>
                            <p>
                              {
                                this.props.msgTimeFromNow(chat.messages[chat.messages.length - 1].created_at)
                              }
                            </p>
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
