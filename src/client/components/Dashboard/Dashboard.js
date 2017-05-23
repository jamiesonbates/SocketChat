import React from 'react';

import './Dashboard.css';

import Nav from '../Nav/Nav.js';
import ChatsList from './ChatsList/ChatsList';
import SingleChat from './SingleChat/SingleChat';

class Dashboard extends React.Component {
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

export default Dashboard;
