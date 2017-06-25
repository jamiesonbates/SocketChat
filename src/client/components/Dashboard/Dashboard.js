import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './Dashboard.css';
import './shared.scss';
import wrapDashboard from '../../containers/WrapDashboard';
import SidePanel from './SidePanel/SidePanel';
import SingleChat from './SingleChat/SingleChat';
import Bookmarks from './Bookmarks/Bookmarks';
import DefaultMain from './DefaultMain/DefaultMain';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.determineChatHeader = this.determineChatHeader.bind(this);
  }

  componentWillMount() {
    this.props.connectSocket();
    this.props.getCommonUsers();
    this.props.getContacts();
  }

  componentDidMount() {
    if (this.props.allChats === null) {
      this.props.fetchChats({});
    }
    else {
      this.handleRooms(this.props.allChats, 'join room');
    }

    this.props.notifyCommonUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.handleRooms(nextProps.allChats, 'join room');
  }

  componentWillUnmount() {
    this.handleRooms(this.props.allChats, 'leave room');
  }

  handleRooms(chats, event) {
    if (!chats) {
      return;
    }

    for (const chat of chats) {
      this.props.manageRoom({ chatId: chat.id, event });
    }
  }

  findUserName(chat, userId) {
    if (!userId) {
      userId = chat.messages[chat.messages.length - 1].userId;
    }
    let foundUser;

    for (const user of chat.users) {
      if (user.id === userId) {
        foundUser = user;
      }
    }

    return foundUser;
  }

  determineChatHeader(chat) {
    if (chat.name) {
      return chat.name;
    }

    const title = chat.users.reduce((acc, user, i, arr) => {
      if (user.id === this.props.userId) {
        return acc;
      }

      if (arr.length - 1 === i || arr.length < 3) {
        acc += `${user.firstName} ${user.lastName}`;

        return acc;
      }

      acc += `${user.firstName} ${user.lastName}, `;

      return acc;
    }, '');

    return title;
  }

  render() {
    return (
      <div className="Dashboard-container">
        <div className="Dashboard-sections-container">
          <SidePanel
            determineChatHeader={this.determineChatHeader}
            findUserName={this.findUserName}
          />

        {/* Where should methods live and/or when should they be passed */}
          {
            this.props.showDefaultMain ?
              <DefaultMain />
            : this.props.showChat ?
                <SingleChat
                  determineChatHeader={this.determineChatHeader.bind(this)}
                  findUserName={this.findUserName.bind(this)}
                />
              : <Bookmarks />
          }
        </div>
      </div>
    )
  }
}

export default wrapDashboard(Dashboard);
