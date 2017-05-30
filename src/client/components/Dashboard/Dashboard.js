import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io();

import './Dashboard.css';
import Nav from '../Nav/Nav';
import ChatsList from './ChatsList/ChatsList';
import SingleChat from './SingleChat/SingleChat';
import { fetchChats, setChat } from '../../state/actions/chatActions';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.chats === null) {
      this.props.dispatch(fetchChats());
    }
    else {
      this.handleRooms(this.props.chats, 'room');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleRooms(nextProps.chats, 'room');
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
      <div className="Dashboard-container">
        <Nav />
        <div className="Dashboard-main-container">
          <ChatsList
            chats={this.props.chats}
            fetchChats={fetchChats}
            setChat={setChat} />
          <SingleChat />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    chats: state.chats.chats
  }
}

export default connect(mapStateToProps)(Dashboard);
