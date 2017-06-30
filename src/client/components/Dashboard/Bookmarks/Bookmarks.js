import React from 'react';

import './Bookmarks.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="Dashboard-main-container">
      </div>
    )
  }
}

export default passPropsByUser(Bookmarks);
