import React from 'react';
import FaGroup from 'react-icons/lib/md/group';

import './NameGroup.scss';

class NameGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormChange() {
    const name = this.refs.groupName.value;

    this.props.setGroupName(name);
  }

  render() {
    return (
      <div className="NameGroup-container">
        <FaGroup className="NameGroup-icon"/>

        <form name="groupNameForm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            ref="groupName"
            placeholder="Name your group"
            autoFocus={true}
            onChange={this.handleFormChange.bind(this)}
            value={this.props.groupNameVal}
          />
        </form>
      </div>
    )
  }
}

export default NameGroup;
