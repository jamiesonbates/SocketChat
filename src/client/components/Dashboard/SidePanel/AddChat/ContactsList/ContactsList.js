import React from 'react';
import FaUser from 'react-icons/lib/fa/user';

import './ContactsList.scss';

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ContactsList-container">
        <h3>Your Contacts</h3>
        {
          this.props.usersContacts.filter((contact) => {
            let isMatch = false;
            const searchTerm = this.props.searchTerm;

            if (!searchTerm) {
              return true;
            }

            if (contact.email.includes(searchTerm) || contact.firstName.includes(searchTerm) || contact.lastName.includes(searchTerm)) {
              isMatch = true;
            }

            return isMatch;
          })
          .map((contact, i) => (
            <div key={i} className="ContactsList-contact">
              <FaUser className="ContactsList-icon" />
              <p>{contact.firstName} {contact.lastName}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ContactsList;
