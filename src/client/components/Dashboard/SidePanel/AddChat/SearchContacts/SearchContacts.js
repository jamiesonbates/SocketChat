import React from 'react';
import FaSearch from 'react-icons/lib/md/search';
import FaClose from 'react-icons/lib/md/close';
import { bindAll } from 'lodash';

import './SearchContacts.scss';

class SearchContacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoFocus: true
    }

    bindAll('removeContactFromGroup');
  }

  setSearchTerm() {
    const term = this.refs.term.value;

    this.props.updateSearchTerm(term);
    this.props.findContacts(term);
  }

  removeContactFromGroup(userId) {
    this.props.removeNewGroupMember(userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newGroup.length > this.props.newGroup.length) {
      this.refs.term.focus();
    }
  }

  render() {
    return (
      <div className="SearchContacts-container">
        <FaSearch className="SearchContacts-icon-search" />

        <form name="searchTerm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            ref="term"
            autoFocus={true}
            onChange={this.setSearchTerm.bind(this)}
            value={this.props.searchTermVal}
          />
        </form>

        {
          this.props.showGroupForm ?
            this.props.newGroup.map((user, i) => (
              <div key={i} className="SearchContacts-groupmember">
                <p>{ user.firstName } { user.lastName }</p>
                <FaClose
                  className="SearchContacts-exit"
                  onClick={() => this.removeContactFromGroup(user.id)} />
              </div>
            ))
          : null
        }

      </div>
    )
  }
}

export default SearchContacts;
