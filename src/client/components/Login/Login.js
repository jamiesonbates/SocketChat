import React from 'react';

import './Login.css';

import Nav from '../Nav/Nav';

class Login extends React.Component {
  constructor() {
    super();
    
    this.state = {
      error: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (!email.includes('@')) {
      this.setState({
        error: 'Bad email or password.'
      })

      return;
    }

    if (password.length < 8) {
      this.setState({
        error: 'Bad email or password.'
      })

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
              this.state.error || this.props.loginError ?
                <div className="Login-error">
                  <p>{this.state.error || this.props.loginError}</p>
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

export default Login;
