import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FaWaves from 'react-icons/lib/ti/waves-outline';

import './Login.scss';
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
      this.props.loginError('Bad email or password.');

      return;
    }

    if (password.length < 8) {
      this.props.loginError('Bad email or password.');

      return;
    }

    this.props.userLogin(email, password);
    this.refs.loginForm.reset();
  }

  render() {
    return (
      <div className="Login-container">
        <div className="Login-header">
          <FaWaves className="Login-logo-icon"/>
          <h1>Socket Chat</h1>
        </div>

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
              Submit
            </button>
          </form>

          <Link className="Login-signup" to='/signUp'>New here? Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Login;
