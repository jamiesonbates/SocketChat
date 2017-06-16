import React from 'react';

import SearchContacts from './SearchContacts/SearchContacts';
import CreateGroup from './CreateGroup/CreateGroup';
import NameGroup from './NameGroup/NameGroup';
import wrapDash from '../../../../containers/WrapDash';
import './AddChat.scss';
import { showGroupFormType } from '../../../../state/actionTypes';
import { updateSide, updateMain } from '../../../../state/actions/dashControlActions';
import { updateGroupName, updateSearchTerm } from '../../../../state/actions/formActions';

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
      </div>
    )
  }
}

export default wrapDash(AddChat);
