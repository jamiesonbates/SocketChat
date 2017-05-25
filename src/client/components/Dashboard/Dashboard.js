import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io();

import './Dashboard.css';
import Nav from '../Nav/Nav';
import ChatsList from './ChatsList/ChatsList';
import SingleChat from './SingleChat/SingleChat';
import { fetchChats } from '../../state/actions/chatActions';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.fetchChats();
  }

  componentDidMount() {
    if (this.props.chats === null) {
      this.props.fetchChats();
    }
    else {
      this.handleRooms(this.props.chats, 'room');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleRooms(nextProps, 'room');
  }

  componentWillUnmount() {
    this.handleRooms(this.props.chats, 'leave room');
  }

  handleRooms(chats, event) {
    for (const chat of chats) {
      socket.emit(event, { room: chat.id });
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <div>
          <ChatsList />
          <SingleChat />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

export default connect(mapStateToProps, {
  fetchChats
})(Dashboard);
