import React from 'react';

import './NameGroup.scss';

const NameGroup = ({ updateGroupName, groupNameVal }) => (
  <div>
    <input type="text" onChange={updateGroupName} value={groupNameVal}/>
  </div>
)

export default NameGroup;
