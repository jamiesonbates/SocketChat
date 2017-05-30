import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
const socket = io();

import './Dashboard.css';
import Nav from '../Nav/Nav';
import ChatsList from './ChatsList/ChatsList';
import SingleChat from './SingleChat/SingleChat';
import { fetchChats, setChat, updateChat } from '../../state/actions/chatActions';

class Dashboard extends React.Component {
  constructor() {
    super();

    socket.on('new msg', (payload) => {
      this.props.dispatch(updateChat(payload));
    });
  }

  componentDidMount() {
    if (this.props.allChats === null) {
      this.props.dispatch(fetchChats());
    }
    else {
      this.handleRooms(this.props.allChats, 'room');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleRooms(nextProps.allChats, 'room');
  }

  componentWillUnmount() {
    this.handleRooms(this.props.allChats, 'leave room');
  }

  handleRooms(chats, event) {
    for (const chat of chats) {
      socket.emit(event, { room: chat.id });
    }
  }

  msgTimeFromNow(time) {
    const timeFromNow = moment(time).valueOf();

    if (timeFromNow > moment(Date.now()).subtract(1, 'm').valueOf()) {
      return 'Now';
    }
    else if (timeFromNow > moment(Date.now()).subtract(1, 'h').valueOf()) {
      return `${moment(Date.now()).diff(timeFromNow, 'm')} min`;
    }
    else if (timeFromNow > moment(Date.now()).subtract(1, 'd').valueOf()) {
      return `${moment(Date.now()).diff(timeFromNow, 'h')} hour`;
    }
    else if (timeFromNow > moment(Date.now()).subtract(2, 'd').valueOf()) {
      return 'Yesterday';
    }
    // needs to be tested
    else if (timeFromNow > moment(Date.now()).subtract(7, 'd').valueOf()) {
      return moment(timeFromNow).format('ddd');
    }
    else {
      return moment(timeFromNow).format('M/D/YY');
    }

    return timeFromNow;
  }

  render() {
    return (
      <div className="Dashboard-container">
        <Nav />
        <div className="Dashboard-main-container">
          <ChatsList
            allChats={this.props.allChats}
            fetchChats={fetchChats}
            msgTimeFromNow={this.msgTimeFromNow}
            setChat={setChat}
          />

          <SingleChat
            allChats={this.props.allChats}
            msgTimeFromNow={this.msgTimeFromNow}
            singleChat={this.props.singleChat}
            userId={this.props.userInfo.id}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    allChats: state.chats.allChats,
    singleChat: state.chats.singleChat,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Dashboard);
