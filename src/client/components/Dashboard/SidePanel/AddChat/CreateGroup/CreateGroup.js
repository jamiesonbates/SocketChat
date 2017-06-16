import React from 'react';
import FaNewGroup from 'react-icons/lib/md/group-add';

import './CreateGroup.scss';

const CreateGroup = ({ navToGroupForm }) => (
  <div
    className="CreateGroup-container"
    onClick={navToGroupForm}>
    <FaNewGroup className="CreateGroup-icon" />
    <h2>New Group</h2>
  </div>
)

export default CreateGroup;
