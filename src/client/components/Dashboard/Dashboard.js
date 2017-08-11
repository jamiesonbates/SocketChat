import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './Dashboard.scss';
import './shared.scss';
import wrapDashboard from '../../containers/WrapDashboard';
import wrapSingleChat from '../../containers/WrapSingleChat';
import SidePanel from './SidePanel/SidePanel';
import SingleChat from './SingleChat/SingleChat';
import Bookmarks from './Bookmarks/Bookmarks';
import DefaultMain from './DefaultMain/DefaultMain';
import UserProfile from './UserProfile/UserProfile';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.determineChatHeader = this.determineChatHeader.bind(this);
  }

  componentWillMount() {
    this.props.connectSocket();
    this.props.getCommonUsers();
    this.props.getContacts();
    this.props.getCategories();
    this.props.fetchChats({ onLoad: true });
  }

  componentDidMount() {
    this.props.notifyCommonUsers();
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

  determineChatHeader(chat) {
    if (chat.name) return chat.name;

    const title = chat.users
      .filter(user => user.id !== this.props.userId)
      .reduce((acc, user, i, arr) => {
      if (arr.length - 1 === i || arr.length < 2) {
        acc += `${user.firstName} ${user.lastName}`;

        return acc;
      }

      acc += `${user.firstName} ${user.lastName}, `;

      return acc;
    }, '');
    console.log('hi');

    return title;
  }

  recognizeLink(message) {
    const httpOrWWW = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/, 'gi');
    const httpOnly = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'gi');

    if (message.match(httpOrWWW)) {
      return (
        <a className="Link-Recognized" href={message.match(httpOnly) ? message : `http://${message}`} target="_blank">{message}</a>
      );
    }
    else {
      return message;
    }
  }

  render() {
    return (
      <div className="Dashboard-container">
        <SidePanel
          determineChatHeader={this.determineChatHeader}
        />

        <div className="Dashboard-main-container">
          {
            this.props.showDefaultMain ?
              <DefaultMain
                determineChatHeader={this.determineChatHeader}
              />
            : this.props.showChat ?
                <SingleChat recognizeLink={this.recognizeLink} />
              : <Bookmarks />
          }
        </div>

        {
          this.props.showUserProfile ?
            <UserProfile />
          : null
        }
      </div>
    )
  }
}

export default wrapDashboard(Dashboard);
