import React from 'react';

import './Bookmarks.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div className="Bookmarks-container">
        <h2>Bookmarks</h2>

        <div className="Bookmarks-list">
          {
            this.props.bookmarks.map((category, i) => (
              <div key={i} className="Bookmarks-category">
                <h3>{category.catName}</h3>

                {
                  category.messages ?
                    category.messages.map((msg, i) => (
                      <div key={i} className="Bookmarks-message">
                        <p>{msg.message}</p>
                      </div>
                    ))
                  : null
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default passPropsByUser(Bookmarks);
