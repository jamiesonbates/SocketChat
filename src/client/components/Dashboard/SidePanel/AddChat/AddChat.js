import React from 'react';

import ContactsList from './ContactsList/ContactsList';
import SearchContacts from './SearchContacts/SearchContacts';
import CreateGroup from './CreateGroup/CreateGroup';
import NameGroup from './NameGroup/NameGroup';
import wrapDash from '../../../../containers/WrapDash';
import './AddChat.scss';
import { showGroupFormType, showChatType, showChatsListType } from '../../../../state/actionTypes';
import { updateSide, updateMain } from '../../../../state/actions/dashControlActions';
import { updateGroupName, updateSearchTerm } from '../../../../state/actions/formActions';
import { setChat } from '../../../../state/actions/chatActions';

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

  handleAddChat(userId) {
    let chatId;
    const chatExists = this.props.allChats.reduce((acc, chat) => {
      if (chat.users.length < 2 && chat.users[0].id === userId) {
        acc = true;
        chatId = chat.id;
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.dispatch(setChat(chatId));
      this.props.dispatch(updateMain(showChatType));
      this.props.dispatch(updateSide(showChatsListType));
      return;
    }
  }

  render() {
    return (
      <div className="Dashboard-side-container">
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
        />

        <ContactsList
          usersContacts={this.props.contacts.usersContacts}
          searchTerm={this.props.forms.searchTerm}
          handleAddChat={this.handleAddChat.bind(this)}
        />
      </div>
    )
  }
}

export default wrapDash(AddChat);
