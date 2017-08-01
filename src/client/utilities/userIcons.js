import React from 'react';
import FaUser from 'react-icons/lib/ti/user';

function userIconMaker(users, type) {
  switch(type) {
    case 'FOR_CHAT':
      return (
        <div className="UserIcon-chat icon">
          <h3>{users[0].firstName[0]}</h3>
        </div>
      )
    break;

    case 'FOR_CONTACT':
      return (
        <div className="UserIcon-contact icon">
          <h3>{users[0].firstName[0]}</h3>
        </div>
      )
    break;

    case 'FOR_SIDE':
      let icon;

      if (users.length < 2) {
        icon = (
          <div className="UserIcon-side icon">
            <h3>{users[0].firstName[0]}</h3>
          </div>
        )
      }
      else if (users.length > 4) {
        icon = (
          <div className="UserIcon-standard-container icon">
            {

              users.filter((user, i) => {
                if (i < 4) {
                  return true;
                }
              })
              .map((user, i) => (
                <div key={i} className="UserIcon-standard">
                  <FaUser className="UserIcon-standard-user" />
                </div>
              ))
            }
          </div>
        )
      }
      else if (users.length >= 3){
        icon = (
          <div className="UserIcon-standard-container icon">
            {
              users.map((user, i) =>
                <div key={i} className="UserIcon-standard">
                  <FaUser className="UserIcon-standard-user" />
                </div>
              )
            }
          </div>
        )
      }
      else {
        icon = (
          <div className="UserIcon-standard-container icon">
            {
              users.map((user, i) =>
                <div key={i} className={i === 0 ? 'UserIcon-standard top' : 'UserIcon-standard bottom'}>
                  <h3>{user.firstName[0]}</h3>
                </div>
              )
            }
          </div>
        )
      }

      return icon;
  }
}

export default userIconMaker;
