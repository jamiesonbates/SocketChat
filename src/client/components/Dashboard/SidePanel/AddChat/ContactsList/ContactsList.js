import React from 'react';
import FaUser from 'react-icons/lib/fa/user';

import './ContactsList.scss';
import Utilities from '../../../../../utilities/Utilities';

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
  }

  filterContacts() {
    return this.props.contacts.filter((contact) => {
      let isMatch = false;
      const searchTerm = this.props.searchTerm;

      if (!searchTerm) {
        return true;
      }

      if (contact.email.includes(searchTerm) || contact.firstName.includes(searchTerm) || contact.lastName.includes(searchTerm)) {
        isMatch = true;
      }

      return isMatch;
    });
  }

  render() {
    return (
      <div className="ContactsList-container">
        <h3 className="ContactsList-header">{this.props.header}</h3>
        {
          this.filterContacts().map((contact, i) => (
            <div
              key={i}
              className="ContactsList-contact"
              onClick={() => this.props.handleContactClick(contact.id)}>
              <div className="ContactsList-icon-container">
                {Utilities.userIconMaker([contact], 'FOR_CONTACT')}
              </div>
              <p>{contact.firstName} {contact.lastName}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ContactsList;
