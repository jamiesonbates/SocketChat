import React from 'react';
import FaUser from 'react-icons/lib/ti/user';

function userIconMaker(users, type) {
  switch(type) {
    case 'FOR_PROFILE':
      const url = buildUrl(users[0].cloudinaryUrl, 'g_face,c_fill,r_max,h_300,w_300');

      return (
        <img
          src={url.join('/')}
          className="Profile-image"
        />
      )
    case 'FOR_CHAT':
      let chatUrl;

      if (users[0].cloudinaryUrl) {
        chatUrl = buildUrl(users[0].cloudinaryUrl, 'g_face,c_fill,r_max,h_300,w_300');
      }

      return users[0].cloudinaryUrl ?
        <img src={chatUrl.join('/')} className="Chat-profile-image" />
      : <div className="UserIcon-chat icon">
          <h3>{users[0].firstName[0].toUpperCase()}</h3>
        </div>
    break;

    case 'FOR_CONTACT':
      let contactUrl;

      if (users[0].cloudinaryUrl) {
        contactUrl = buildUrl(users[0].cloudinaryUrl, 'g_face,c_fill,r_max,h_300,w_300');
      }

      return users[0].cloudinaryUrl ?
        <img src={contactUrl.join('/')} className="Contact-profile-image" />
      : <div className="UserIcon-contact icon">
          <h3>{users[0].firstName[0].toUpperCase()}</h3>
        </div>
    break;

    case 'FOR_SIDE':
      let icon;

      if (users.length < 2) {
        let url;

        if (users[0].cloudinaryUrl) {
          url = buildUrl(users[0].cloudinaryUrl, 'g_face,c_fill,r_max,h_300,w_300');
        }

        icon = users[0].cloudinaryUrl ?
          <img src={url.join('/')} className="Side-profile-image" />
        : <div className="UserIcon-side icon">
            <h3>{users[0].firstName[0].toUpperCase()}</h3>
          </div>

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
              users.map((user, i) => {
                let url;

                if (user.cloudinaryUrl) {
                  url = buildUrl(user.cloudinaryUrl, 'g_face,c_fill,r_max,h_300,w_300');
                }

                return user.cloudinaryUrl ?
                  <img
                    key={i}
                    src={url.join('/')}
                    className={ i === 0 ? "Side-profile-image top" : 'Side-profile-image bottom' }
                  />
                : <div
                    key={i}
                    className={i === 0 ? 'UserIcon-standard top' :'UserIcon-standard bottom'}>
                    <h3>{user.firstName[0].toUpperCase()}</h3>
                  </div>
              })
            }
          </div>
        )
      }

      return icon;
  }
}

function buildUrl(url, specs) {
  url = url.split('/');

  url = [
    ...url.splice(0, url.indexOf('upload') + 1),
    specs,
    ...url.splice(url.indexOf('upload') + 1)
  ];

  let extension = url[url.length - 1].slice(0, url[url.length - 1].length - 3) + 'png';

  url[url.length - 1] = extension;

  return url;
}

export default userIconMaker;
