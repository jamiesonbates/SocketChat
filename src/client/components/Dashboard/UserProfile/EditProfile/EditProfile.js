import React from 'react';
import axios from 'axios';

import './EditProfile.scss';
import { showUserProfileType } from '../../../../state/actionTypes';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      username: this.props.username,
      email: this.props.email,
      usernameExists: false,
      emailExists: false
    }

    this.updateProfileInfo = this.updateProfileInfo.bind(this);
  }

  updateProfileInfo({ firstName, lastName, username, email }) {
    const nextState = {};

    if (firstName) nextState.firstName = firstName;
    if (lastName) nextState.lastName = lastName;
    if (username) nextState.username = username;
    if (email) nextState.email = email;

    this.setState(prevState => {
      return {
        ...prevState,
        ...nextState
      }
    })
  }

  handleEditSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, username } = this.state;

    if (firstName === this.props.firstName && lastName === this.props.lastName && email === this.props.email && username === this.props.username) {
      this.props.updateMain(showUserProfileType);

      return;
    }

    this.validateUsername(username)
      .then((data) => {
        if (typeof data === 'string' && username !== this.props.username) {
          this.setState({ usernameExists: data });

          return;
        }

        return this.validateEmail(email);
      })
      .then((data) => {
        if (typeof data === 'string' && email !== this.props.email) {
          this.setState({ emailExists: data });

          return;
        }

        this.props.editUserProfile({
          firstName,
          lastName,
          email,
          username,
          userId: this.props.userId
        });
        this.props.updateMain(showUserProfileType);
      });
  }

  // TODO: could be used within signup
  validateUsername(username) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/verify_username', { username })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  // TODO: could be used within signup
  validateEmail(email) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/verify_email', { email })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  render() {
    return (
      <div className="EditProfile">
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleEditSubmit.bind(this)}>
          <div className="field">
            <label>First Name</label>
            <div className="input-container">
              <input
                onChange={(e) => this.updateProfileInfo({ firstName: e.target.value })}
                type="text"
                value={this.state.firstName}
              />
            </div>
          </div>

          <div className="field">
            <label>Last Name</label>
            <div className="input-container">
              <input
                onChange={(e) => this.updateProfileInfo({ lastName: e.target.value })}
                type="text"
                value={this.state.lastName}
              />
            </div>
          </div>

          <div className="field">
            <label>Username</label>
            <div className="input-container">
              <input
                onChange={(e) => this.updateProfileInfo({ username: e.target.value })}
                type="text"
                value={this.state.username}
              />
            </div>

            {
              this.state.usernameExists ?
                <p>{this.state.usernameExists}</p>
              : null
            }
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-container">
              <input
                onChange={(e) => this.updateProfileInfo({ email: e.target.value })}
                type="email"
                value={this.state.email}
              />
            </div>

            {
              this.state.emailExists ?
                <p>{this.state.emailExists}</p>
              : null
            }
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    )
  }
}

export default EditProfile;
