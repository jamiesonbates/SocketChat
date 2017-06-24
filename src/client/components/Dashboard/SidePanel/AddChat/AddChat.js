import React from 'react';
import FaCheck from 'react-icons/lib/md/check';

import ContactsList from './ContactsList/ContactsList';
import SearchContacts from './SearchContacts/SearchContacts';
import CreateGroup from './CreateGroup/CreateGroup';
import NameGroup from './NameGroup/NameGroup';
import wrapSidePanel from '../../../../containers/WrapSidePanel';
import './AddChat.scss';
import { showGroupFormType, showChatType, showChatsListType } from '../../../../state/actionTypes';

class AddChat extends React.Component {
  constructor(props) {
    super(props);
  }

  navToGroupForm() {
    this.props.updateSide(showGroupFormType);
  }

  setGroupName(name) {
    this.props.updateGroupName(name);
  }

  setSearchTerm(term) {
    this.props.updateSearchTerm(term);
  }

  handleAddSingleChat(userId) {
    let chatId;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length < 3) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      for (const user of chat.users) {
        if (user.id === userId) {
          chatId = chat.id;
          acc = true;
          return acc;
        }
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.setChat(chatId);
    }
    else {
      this.props.createChat([userId]);
    }
  }

  handleAddMultiChat(userId) {
    this.props.addNewGroupMember(userId);
  }

  handleCreateNewGroup() {
    let chatId;
    const newGroup = this.props.newGroup;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length === newGroup.length + 1) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      const newGroup = this.props.newGroup;

      const isMatch = newGroup.reduce((acc, userId) => {
        for (const user of chat.users) {
          if (userId.id === user.id) {
            acc = true;

            return acc;
          }
          else {
            acc = false;
          }
        }

        return acc;
      }, false);

      if (isMatch) {
        acc = true;
        chatId = chat.id;

        return acc;
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.setChat(chatId);
    }
    else {
      let userGroup = [
        ...this.props.newGroup
      ]
      .map(user => user.id);

      this.props.createChat(userGroup);
    }
  }

  render() {
    return (
      <div className="Dashboard-side-container">
        <div className="AddChat-form-container">
          {
            this.props.showGroupForm ?
              <NameGroup
                setGroupName={this.setGroupName.bind(this)}
                groupNameVal={this.props.groupName}
              />
            : <CreateGroup navToGroupForm={this.navToGroupForm.bind(this)}/>
          }

          <SearchContacts
            setSearchTerm={this.setSearchTerm.bind(this)}
            searchTermVal={this.props.searchTerm}
            showGroupForm={this.props.showGroupForm}
            newGroup={this.props.newGroup}
          />

          {
            this.props.showGroupForm ?
              <FaCheck
                className="AddChat-icon-check"
                onClick={this.handleCreateNewGroup.bind(this)}
              />
            : null
          }
        </div>

        {
          this.props.showGroupForm ?
            <ContactsList
              usersContacts={this.props.usersContacts}
              searchTerm={this.props.searchTerm}
              handleAddChat={this.handleAddMultiChat.bind(this)}
            />
          : <ContactsList
              usersContacts={this.props.usersContacts}
              searchTerm={this.props.searchTerm}
              handleAddChat={this.handleAddSingleChat.bind(this)}
            />
        }
      </div>
    )
  }
}

export default wrapSidePanel(AddChat);
