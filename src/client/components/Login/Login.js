import React from 'react';
import { connect } from 'react-redux';

import './Login.css';
import Nav from '../Nav/Nav';
import { userLogin } from '../../state/actions/userActions';
import { loginError } from '../../state/actions/errorActions';

class Login extends React.Component {
  constructor() {
    super();
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (!email.includes('@')) {
      this.props.dispatch(loginError('Bad email or password.'));

      return;
    }

    if (password.length < 8) {
      this.props.dispatch(loginError('Bad email or password.'));

      return;
    }

    this.props.dispatch(userLogin(email, password));
    this.refs.loginForm.reset();
  }

  render() {
    return (
      <div className="Login-container">
        <Nav />

        <div className="Login-form-container">
          <form onSubmit={this.handleSubmit.bind(this)} ref="loginForm" className="Login-form">
            <h2>Login</h2>
            <div className="Login-input-container">
              <input type="text" ref="email" placeholder="Email"/>
            </div>

            <div className="Login-input-container">
              <input type="password" ref="password" placeholder="Password"/>
            </div>

            {
              this.props.errors.login ?
                <div className="Login-error">
                  <p>{this.props.errors.login}</p>
                </div>
              : null
            }

            <button
              type="submit"
              className="Login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    errors: store.errors
  }
}

export default connect(mapStateToProps)(Login);
