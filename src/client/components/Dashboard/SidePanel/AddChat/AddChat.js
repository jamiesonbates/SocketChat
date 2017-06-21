import React from 'react';
import FaCheck from 'react-icons/lib/md/check';

import ContactsList from './ContactsList/ContactsList';
import SearchContacts from './SearchContacts/SearchContacts';
import CreateGroup from './CreateGroup/CreateGroup';
import NameGroup from './NameGroup/NameGroup';
import wrapDash from '../../../../containers/WrapDash';
import './AddChat.scss';
import { showGroupFormType, showChatType, showChatsListType } from '../../../../state/actionTypes';
import { updateSide, updateMain } from '../../../../state/actions/dashControlActions';
import { updateGroupName, updateSearchTerm } from '../../../../state/actions/formActions';
import { setChat, createChat } from '../../../../state/actions/chatActions';
import { addNewGroupMember } from '../../../../state/actions/contactsActions';

class AddChat extends React.Component {
  constructor(props) {
    super(props);
  }

  navToGroupForm() {
    this.props.dispatch(updateSide(showGroupFormType));
  }

  setGroupName(name) {
    this.props.dispatch(updateGroupName(name));
  }

  setSearchTerm(term) {
    this.props.dispatch(updateSearchTerm(term));
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
      this.props.dispatch(setChat(chatId));
    }
    else {
      this.props.dispatch(createChat([userId]));
    }
  }

  handleAddMultiChat(userId) {
    this.props.dispatch(addNewGroupMember(userId));
  }

  handleCreateNewGroup() {
    let chatId;
    const newGroup = this.props.contacts.newGroup;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length === newGroup.length + 1) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      const newGroup = this.props.contacts.newGroup;

      const isMatch = newGroup.reduce((acc, userId) => {
        for (const user of chat.users) {
          if (userId.id === user.id || this.props.userInfo.id === user) {
            acc = true;
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
      this.props.dispatch(setChat(chatId))
    }
    else {
      let userGroup = [
        ...this.props.contacts.newGroup
      ]
      .map(user => user.id);

      this.props.dispatch(createChat(userGroup))
    }
  }

  render() {
    return (
      <div className="Dashboard-side-container">
        <div className="AddChat-form-container">
          {
            this.props.dashControls.showGroupForm ?
              <NameGroup
                setGroupName={this.setGroupName.bind(this)}
                groupNameVal={this.props.forms.groupName}
              />
            : <CreateGroup navToGroupForm={this.navToGroupForm.bind(this)}/>
          }

          <SearchContacts
            setSearchTerm={this.setSearchTerm.bind(this)}
            searchTermVal={this.props.forms.searchTerm}
            showGroupForm={this.props.dashControls.showGroupForm}
            newGroup={this.props.contacts.newGroup}
          />

          {
            this.props.dashControls.showGroupForm ?
              <FaCheck
                className="AddChat-icon-check"
                onClick={this.handleCreateNewGroup.bind(this)}
              />
            : null
          }
        </div>

        {
          this.props.dashControls.showGroupForm ?
            <ContactsList
              usersContacts={this.props.contacts.usersContacts}
              searchTerm={this.props.forms.searchTerm}
              handleAddChat={this.handleAddMultiChat.bind(this)}
            />
          : <ContactsList
              usersContacts={this.props.contacts.usersContacts}
              searchTerm={this.props.forms.searchTerm}
              handleAddChat={this.handleAddSingleChat.bind(this)}
            />
        }
      </div>
    )
  }
}

export default wrapDash(AddChat);
