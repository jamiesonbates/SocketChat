import React from 'react';
import FaSearch from 'react-icons/lib/md/search';

import './SearchContacts.scss';

class SearchContacts extends React.Component {
  constructor(props) {
    super(props);
  }

  setSearchTerm() {
    const term = this.refs.term.value;

    this.props.updateSearchTerm(term);
  }

  render() {
    return (
      <div className="SearchContacts-container">
        <FaSearch className="SearchContacts-icon-search" />

        {
          this.props.showGroupForm ?
            this.props.newGroup.map((user, i) => (
              <div key={i} className="SearchContacts-groupmember">
                <p>{ user.firstName } { user.lastName }</p>
              </div>
            ))
          : null
        }

        <form name="searchTerm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            ref="term"
            autoFocus={true}
            onChange={this.setSearchTerm.bind(this)}
            value={this.props.searchTermVal}
          />
        </form>
      </div>
    )
  }
}

export default SearchContacts;
