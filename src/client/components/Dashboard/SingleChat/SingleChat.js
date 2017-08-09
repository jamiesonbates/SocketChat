import React from 'react';
import moment from 'moment';
import FaChat from 'react-icons/lib/ti/message';
import FaUsers from 'react-icons/lib/fa/user-plus';
import FaUser from 'react-icons/lib/fa/user';
import FaEdit from 'react-icons/lib/go/pencil';
import FaClose from 'react-icons/lib/md/close';
import 'react-select/dist/react-select.css';
import { bindAll } from 'lodash';

import './SingleChat.scss';
import wrapSingleChat from '../../../containers/WrapSingleChat';
import { showUserProfileType } from '../../../state/actionTypes';
import Message from './Message';
import Typing from './Typing';
import UserIdentifier from '../UserIdentifier/UserIdentifier';
import Utilities from '../../../utilities/Utilities';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkMsgId: null,
      editingChatName: false,
      newChatName: this.props.currentChat.name,
      showUsers: true
    }

    bindAll(this, 'handleTyping', 'handleEditChatName', 'handleChatNameChange', 'handleExitEditChatName', 'handleSubmitNameChange', 'toggleUsers');
  }

  updateScroll() {
    const msgDiv = document.querySelector('.SingleChat-messages-container');

    if (msgDiv && !this.state.bookmarkMsgId && msgDiv.lastElementChild) {
      msgDiv.lastElementChild.scrollIntoView();
    }
  }

  createMessage(date, i, message, userId, newMessageStart) {
    return (
      <div key={i} className="SingleChat-single-message-container">
        {
          date ?
            <div className="SingleChat-time">
              <h4>{date}</h4>
              <div className="SingleChat-line"></div>
            </div>
          : null
        }

        {
          newMessageStart ?
            <div className="SingleChat-new">
              <h4>New Messages</h4>
              <div className="SingleChat-line red"></div>
            </div>
          : null
        }

        <div className="SingleChat-message-container">
          {
            message.userId !== userId ?
              <div className="Message-user-icon">
                {
                  Utilities.userIconMaker([Utilities.findUser(this.props.currentChatUsers, message.userId)], 'FOR_CHAT')
                }
              </div>
            : null
          }

          <div className="SingleChat-message">
            <Message
              messageClass={
                message.userId === userId ?
                  'SingleChat-currentUser'
                : 'SingleChat-otherUser'
              }
              messageColor={
                message.userId === userId ?
                  'SingleChat-currentUser-color'
                : 'SingleChat-otherUser-color'
              }
              message={message}
              starred={message.starred}
              user={
                message.userId === userId ?
                  null
                : Utilities.findUser(this.props.currentChatUsers, message.userId)
              }
              handleExitBookmarking={this.handleExitBookmarking.bind(this)}
              handleBookmarking={this.handleBookmarking.bind(this)}
              bookmarkMsgId={this.state.bookmarkMsgId}
              categories={this.props.categories}
              bookmarkMsg={this.props.bookmarkMsg}
              updateMain={this.props.updateMain}
              updateTargetUserId={this.props.updateTargetUserId}
              createBookmarkClass={
                message.userId === userId ?
                  'right'
                : 'left'
              }
              recognizeLink={this.props.recognizeLink}
            />
          </div>
        </div>
      </div>
    )
  }

  handleSendMessage(e) {
    e.preventDefault();
    const message = this.refs.msg.value;
    const userId = this.props.userId;
    const chatId = this.props.chatId;

    if (message.length < 1) {
      return;
    }

    this.props.sendMessage({ message, userId, chatId });
    this.props.stoppedTyping(chatId);
    this.refs.messageForm.reset();
  }

  handleTyping(isTyping) {
    const chatId = this.props.chatId;

    if (isTyping) {
      this.props.startedTyping(chatId);
    }
    else {
      this.props.stoppedTyping(chatId);
    }
  }

  handleClickOnUser(userId) {
    this.props.updateTargetUserId(userId);
    this.props.updateMain(showUserProfileType);
  }

  // TODO: used multiple places - condense
  userIsOnline(userId) {
    const bool = this.props.usersOnline.reduce((acc, id) => {
      if (id === userId) {
        acc = true;
      }

      return acc;
    }, false);

    return bool;
  }

  componentWillUnmount() {
    this.props.resetSingleChat();
  }

  componentDidMount() {
    if (this.props.newMessages.count < 1) {
      this.props.updateChatSeen({ chatId: this.props.chatId, next: false });
    }
    else {
      this.props.updateChatSeen({ chatId: this.props.chatId, next: true });
    }

    this.updateScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chatId !== this.props.chatId) {
      this.props.updateChatSeen({ chatId: this.props.chatId, next: false, leaving: true });

      if (nextProps.newMessages.count < 1) {
        this.props.updateChatSeen({ chatId: nextProps.chatId, next: false});
      }
      else {
        this.props.updateChatSeen({ chatId: nextProps.chatId, next: true });
      }

      this.setState({
        editingChatName: false,
        newChatName: nextProps.currentChat.name
      });
    }

    if (nextProps.currentChat.name !== this.props.currentChat.name) {
      this.setState({
        editingChatName: false,
        newChatName: nextProps.currentChat.name
      })
    }
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  handleBookmarking(bookmarkMsgId) {
    this.setState({ bookmarkMsgId });
  }

  handleExitBookmarking() {
    this.setState({ bookmarkMsgId: null });
  }

  handleEditChatName() {
    this.setState({ editingChatName: true });
  }

  handleChatNameChange(e) {
    const newChatName = e.target.value;

    this.setState({ newChatName });
  }

  handleExitEditChatName() {
    this.setState({ editingChatName: false });
  }

  handleSubmitNameChange(e) {
    e.preventDefault();

    this.props.changeChatName({
      name: this.state.newChatName,
      chatId: this.props.currentChat.id
    });

    // this.setState({ editingChatName: false });
  }

  toggleUsers() {
    this.setState(prevState => {
      return {
        showUsers: !prevState.showUsers
      }
    });
  }

  render() {
    return (
      <div className="SingleChat-container">
        <div className="SingleChat-header-container">
          <div className="SingleChat-title-container">
            {
              this.props.currentChat ?
                <FaChat className="SingleChat-chat-icon" />
              : null
            }

            {
              this.props.currentChat ?
                <div className="SingleChat-header-title">
                  {
                    this.props.currentChatUsers.length < 3 ?
                      this.props.currentChat.users
                        .filter(user => user.id !== this.props.userId)
                        .map((user, i) =>
                          <UserIdentifier
                            key={i}
                            userId={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            updateMain={this.props.updateMain}
                            updateTargetUserId={this.props.updateTargetUserId}
                            updateUserProfile={this.props.updateUserProfile}
                          />)
                    : this.props.currentChat.name ?
                        this.state.editingChatName ?
                          <div>
                            <form onSubmit={this.handleSubmitNameChange}>
                              <input
                                className="SingleChat-edit-input"
                                onChange={this.handleChatNameChange}
                                autoFocus={true}
                                type="text"
                                value={this.state.newChatName} />

                              <button
                                type="submit"
                                className="SingleChat-edit-name-btn" >
                                Update
                              </button>

                              <FaClose
                                className="SingleChat-cancel-edit-name"
                                onClick={this.handleExitEditChatName} />
                            </form>
                          </div>
                        : <div className="SingleChat-title">
                            <h2>{this.props.currentChat.name}</h2>
                            <FaEdit
                              className="SingleChat-edit-title"
                              onClick={this.handleEditChatName} />
                          </div>
                      : this.state.editingChatName ?
                          <div>
                            <form onSubmit={this.handleSubmitNameChange}>
                              <input
                                className="SingleChat-edit-input"
                                onChange={this.handleChatNameChange}
                                autoFocus={true}
                                type="text"
                                placeholder="Name this chat"/>

                              <button
                                className="SingleChat-edit-name-btn"
                                type="submit">
                                Create
                              </button>

                              <FaClose
                                className="SingleChat-cancel-edit-name"
                                onClick={this.handleExitEditChatName} />
                            </form>
                          </div>
                        : <div className="SingleChat-title">
                            <h2>Group Chat</h2>

                            <FaEdit
                              className="SingleChat-edit-title"
                              onClick={this.handleEditChatName} />
                          </div>
                  }
                </div>
              : null
            }

            {
              this.props.currentChat && this.props.currentChatUsers.length < 3 ?
                this.props.currentChatUsers
                  .map((user, i) => (
                    this.userIsOnline(user.id) ?
                      user.id !== this.props.userId ?
                        <div key={i} className="SingleChat-userIsOnline-large">
                        </div>
                      : null
                    : user.id !== this.props.userId ?
                        <div key={i} className="SingleChat-userIsOffline-large">
                        </div>
                      : null
                  ))
              : null
            }
          </div>

          {
            <div className="SingleChat-header-options">
              {
                this.props.currentChatUsers.length > 2 ?
                  this.state.showUsers ?
                    <p
                      className="SingleChat-users-toggle" onClick={this.toggleUsers}>
                      Hide Users
                    </p>
                  : <p
                      className="SingleChat-users-toggle"
                      onClick={this.toggleUsers}>
                      Show Users
                    </p>
                : null
              }

              {
                this.state.showUsers && this.props.currentChat && this.props.currentChatUsers.length > 2 ?
                this.props.currentChatUsers
                  .sort((a, b) => {
                    const aOnline = this.userIsOnline(a.id);
                    const bOnline = this.userIsOnline(b.id);

                    if (aOnline && !bOnline) {
                      return -1;
                    }
                    else if (bOnline && !aOnline){
                      return 1;
                    }
                    else {
                      return 0;
                    }
                  })
                  .map((user, i) => {
                    if (user.id === this.props.userId) {
                      return null;
                    }

                    return (
                      <div
                        key={i}
                        className="SingleChat-user"
                        >
                          <UserIdentifier
                            userId={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            updateMain={this.props.updateMain}
                            updateTargetUserId={this.props.updateTargetUserId}
                            updateUserProfile={this.props.updateUserProfile}
                          />
                          {
                            this.userIsOnline(user.id) ?
                            <div className="SingleChat-userIsOnline"></div>
                            : <div className="SingleChat-userIsOffline"></div>
                          }
                        </div>
                      )
                    })
                : null
              }
            </div>
          }
        </div>

        <div className="SingleChat-messages-container">
          {
            // TODO: must condense and abstract this
            // TODO: clean up logic
            this.props.currentChat && this.props.currentChatMessages ?
              this.props.currentChatMessages.map((message, i) => {
                const allMessages = this.props.currentChatMessages;
                const lastSeen = moment(this.props.lastSeen.lastSeen).valueOf();
                const messageTime = moment(message.createdAt).valueOf();
                const { userId } = this.props;
                let newMessageStart = false;
                let messageJSX;
                let prevMessage = allMessages[i - 1];

                // might not need this logic
                if (i - 1 < 0) {
                  prevMessage = message;
                }

                if (i === 0 && messageTime > lastSeen) {
                  newMessageStart = true;
                }

                if (messageTime > lastSeen && moment(prevMessage.createdAt).valueOf() < lastSeen) {
                    newMessageStart = true;
                }

                if (!this.props.lastSeen.hadNewMessages && Object.keys(this.props.lastSeen).includes('hadNewMessages')) {
                  newMessageStart = false;
                }

                if (i + 1 < allMessages.length || i === 0) {
                  let lastDate;

                  if (i !== 0) {
                    lastDate = moment(allMessages[i - 1].createdAt).date();
                  }

                  const curDate = moment(allMessages[i].createdAt).date();
                  let nextDate;

                  if (allMessages.length > 1) {
                    nextDate = moment(allMessages[i + 1].createdAt).date()
                  }

                  let todayDate = new Date();
                  let yesterdayDate = new Date();

                  todayDate = todayDate.getDate();
                  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                  yesterdayDate = yesterdayDate.getDate();

                  if ((i === 0 && todayDate === curDate) || (curDate !== lastDate && curDate === todayDate)) {
                    messageJSX = this.createMessage('Today', i, message, userId, newMessageStart);
                  }
                  else if (i === 0) {
                    messageJSX = this.createMessage( moment(message.createdAt).format('MMMM Do'), i, message, userId, newMessageStart);
                  }
                  else if (curDate !== nextDate && curDate === yesterdayDate) {
                    messageJSX = this.createMessage('Yesterday', i, message, userId, newMessageStart);
                  }
                  else if (nextDate !== curDate) {
                    messageJSX = this.createMessage(moment(message.createdAt).format('MMMM Do'), i, message, userId, newMessageStart);
                  }
                  else {
                    messageJSX = this.createMessage(null, i, message, userId, newMessageStart);
                  }
                }
                else {
                  messageJSX = this.createMessage(null, i, message, userId, newMessageStart);
                }

                return messageJSX;
              })
            : null
          }
        </div>

        <div className="SingleChat-typing-container">
          {
            this.props.currentChat ?
              this.props.chatsWithTyping.includes(this.props.chatId) ?
                <div className="SingleChat-typing">
                  <p>Typing...</p>
                </div>
              : null
            : null
          }
        </div>

        <div className="SingleChat-form-container">
          <form onSubmit={this.handleSendMessage.bind(this)} ref="messageForm">
            <input
              onBlur={() => this.handleTyping(false)}
              onChange={() => this.handleTyping(true)}
              type="text"
              ref="msg"
              placeholder="Send a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default wrapSingleChat(SingleChat);
