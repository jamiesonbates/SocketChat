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

  render() {
    return (
      <div className="Dashboard-container">
        <Nav />
        <div className="Dashboard-main-container">
          <ChatsList
            allChats={this.props.allChats}
            fetchChats={fetchChats}
            setChat={setChat}
          />

          <SingleChat
            allChats={this.props.allChats}
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
