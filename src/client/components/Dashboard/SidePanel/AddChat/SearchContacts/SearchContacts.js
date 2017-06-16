import React from 'react';
import FaSearch from 'react-icons/lib/md/search';

import './SearchContacts.scss';

class SearchContacts extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormChange() {
    const term = this.refs.term.value;

    this.props.setSearchTerm(term);
  }

  render() {
    return (
      <div className="SearchContacts-container">
        <FaSearch className="SearchContacts-icon"/>
        <form name="searchTerm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            ref="term"
            onChange={this.handleFormChange.bind(this)}
            value={this.props.searchTermVal}
          />
        </form>
      </div>
    )
  }
}

export default SearchContacts;
