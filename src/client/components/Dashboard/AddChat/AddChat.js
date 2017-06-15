import React from 'react';

import CreateGroup from './CreateGroup/CreateGroup';
import NameGroup from './NameGroup/NameGroup';
import wrapDash from '../../../containers/WrapDash';
import './AddChat.scss';
import { showGroupFormType } from '../../../state/actionTypes';
import { updateSide, updateMain } from '../../../state/actions/dashControlActions';

class AddChat extends React.Component {
  constructor(props) {
    super(props);
  }

  navToGroupForm() {
    this.props.dispatch(this.props.updateSide(showGroupFormType));
  }

  render() {
    return (
      <div className="Dashboard-side-container">
        {
          this.props.sideStatus.showGroupForm ?
            <NameGroup />
          : <CreateGroup />
        }
      </div>
    )
  }
}

export default wrapDash(AddChat);
