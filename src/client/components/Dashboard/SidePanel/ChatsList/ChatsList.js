import React from 'react';
import moment from 'moment';
import FaNewChat from 'react-icons/lib/md/chat';


import './ChatsList.css';
import wrapDash from '../../../../containers/WrapDash';
import ChatPeak from './ChatPeak/ChatPeak';
import { showChatType, showAddChatType } from '../../../../state/actionTypes';
import { updateSide } from '../../../../state/actions/dashControlActions';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
  }

  openChat(id) {
    this.props.dispatch(this.props.setChat(id));
    this.props.dispatch(this.props.updateMain(showChatType));
  }

  determineTimeDisplay(time) {
    const nowMil = moment(Date.now()).valueOf();
    const timeMil = moment(time).valueOf();
    const diff = nowMil - timeMil;
    const midnightDiff = nowMil - moment(new Date().setUTCHours(0, 0, 0, 0)).valueOf();
    const weekAgoDiff = nowMil - moment(Date.now()).subtract(6, 'days').valueOf();

    if (diff < 60000) {
      return 'Now';
    }
    else if (diff < 3600000) {
      return Math.floor(diff / 60000) + 'm'
    }
    else if (diff < midnightDiff) {
      return moment(timeMil).format('h:mm A');
    }
    else if (diff < weekAgoDiff) {
      return moment(timeMil).format('ddd');
    }
    else {
      return moment(timeMil).format('M/D/YY');
    }
  }

  render() {
    return (
      <div className="ChatsList-container">
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
                      userId={this.props.userId}
                      determineChatHeader={this.props.determineChatHeader}
                      findUserName={this.props.findUserName}
                      time={this.determineTimeDisplay(chat.messages[chat.messages.length - 1].createdAt)}
                    />
                  }
                </div>
              ))
            : null
        }



        <FaNewChat
          className="ChatsList-newChat-btn"
          onClick={() => this.props.dispatch(updateSide(showAddChatType))}
        />
      </div>
    )
  }
}

export default wrapDash(ChatsList);
