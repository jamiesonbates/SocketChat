import React from 'react';
import FaWaves from 'react-icons/lib/ti/waves-outline';
import FaDown from 'react-icons/lib/ti/arrow-sorted-down';

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

  handleAddMultiChat(userId) {
    this.props.addNewGroupMember(userId);
  }

  componentWillUnmount() {
    this.props.resetNewGroup();
    this.props.updateSearchTerm('');
  }

  render() {
    return (
      <div className="AddChat-container">
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
            updateSearchTerm={this.props.updateSearchTerm}
            searchTerm={this.props.searchTerm}
            showGroupForm={this.props.showGroupForm}
            newGroup={this.props.newGroup}
            findContacts={this.props.findContacts}
            removeNewGroupMember={this.props.removeNewGroupMember}
          />

          {/* {
            this.props.showGroupForm ?
              <FaCheck
                className="AddChat-icon-check"
                onClick={this.handleCreateNewGroup.bind(this)}
              />
            : null
          } */}
        </div>
        <div className="AddChat-contacts-container">

          {
            this.props.showGroupForm ?
              <ContactsList
                header={'Your Contacts'}
                contacts={this.props.usersContacts}
                searchTerm={this.props.searchTerm}
                handleContactClick={this.handleAddMultiChat.bind(this)}
              />
            : <ContactsList
                header={'Your Contacts'}
                contacts={this.props.usersContacts}
                searchTerm={this.props.searchTerm}
                handleContactClick={this.props.handleAddSingleChat}
              />
          }

          {
            this.props.searchForOtherUsers ?
              this.props.showGroupForm ?
                <ContactsList
                  header={'Other Users'}
                  contacts={this.props.otherContacts}
                  searchTerm={this.props.searchTerm}
                  handleContactClick={this.handleAddMultiChat.bind(this)}
                />
              : <ContactsList
                  header={'Other Users'}
                  contacts={this.props.otherContacts}
                  searchTerm={this.props.searchTerm}
                  handleContactClick={this.props.handleAddSingleChat}
                />
            : null
          }

          {
            !this.props.searchForOtherUsers ?
              <div className="SidePanel-search-other-users" onClick={this.props.handleSearchForOtherUsers}>
                <div className="container">
                  <FaWaves className="SidePanel-search-other-users-icon waves" />

                  <p>Find new people</p>
                </div>

                <FaDown className="SidePanel-search-other-users-icon" />
              </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default wrapSidePanel(AddChat);
