import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userName: '',
      email: '',
      password: '',
      passwordVerify: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleVerifypasswordChange = this.handleVerifypasswordChange.bind(this);
  }

  handleNameChange() {
    this.setState({
      name: event.target.value
    });
  }

  handleUserNameChange() {
    this.setState({
      userName: event.target.value
    });
  }

  handleEmailChange() {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange() {
    this.setState({
      password: event.target.value
    });
  }

  handleVerifypasswordChange() {
    this.setState({
      passwordVerify: event.target.value
    });
  }

  handleUserSubmit() {
    event.preventDefault();
    if (this.state.password !== this.state.passwordVerify) {
      return window.alert('Passwords do not Match');
    }
    const user = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    this.context.handleUserSignup(user)
      .then(() => { this.props.history.push('/login'); });
  }

  render() {
    return (
      <div className="container-fluid d-flex ratatouille flex-column fadeIn">
        <div className="row justify-content-center  mt-2 mb-3">
          <img src="/images/logo1.png" height="150" width="200" alt="loading" />
        </div>
        <div className="row justify-content-around text-light ">
          <h1 className="signup">Sign Up</h1>
          <div className="col-12 col-md-10">
            <form onSubmit={this.handleUserSubmit} className="input-group  flex-column">
              <div className="form-group my-4">
                <div className="input-group  w-100 flex-row">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control w-70"
                    required
                    autoFocus
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <div className="form-group my-4">
                <div className="input-group  w-100 flex-row">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="far fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control w-70"
                    required
                    autoFocus
                    onChange={this.handleUserNameChange}
                  />
                </div>
              </div>
              <div className="form-group my-4">
                <div className="input-group  w-100 flex-row">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control w-70"
                    required
                    autoFocus
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
              <div className="form-group my-4 ">
                <div className="input-group  w-100 flex-row">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control w-70"
                    required
                    autoFocus
                    onChange={this.handlePasswordChange} />
                </div>
              </div>
              <div className="form-group my-4">
                <div className="input-group  w-100 flex-row">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-lock" />
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="form-control w-70"
                    required
                    autoFocus
                    onChange={this.handleVerifypasswordChange}
                  />
                </div>
              </div>
              <div className="input-group-append flex-column w-100 justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary rounded my-2">
                    Create Account
                </button>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-light rounded my-2">
                  Back to Login Page
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.contextType = AppContext;
