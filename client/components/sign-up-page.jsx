import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import Swal from 'sweetalert2';

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
      return Swal.fire('Passwords do not Match');
    }
    const user = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g
    if(!user.password.match(lowerCase)){
      return Swal.fire('Password must contain a lowercased letter')
    } else if(!user.password.match(upperCase)){
      return Swal.fire('Password must contain an uppercased letter')
    } else if(!user.password.match(numbers)){
      return Swal.fire('Password must contain a number')
    } else {
      this.context.handleUserSignup(user)
      .then(() => { this.props.history.push('/login'); });
    }
  }

  render() {
    return (
      <div className="container-fluid align-items-center d-flex login-background flex-column fadeIn">
        <div className="row justify-content-center  mt-5 mb-2">
          <img src="/images/new-logo.png" height="150" width="200" alt="loading" />
        </div>
        <div className="row text-center p-2 flex-row intro-card card justify-content-around text-light ">
          <h1 className="pink">Sign Up</h1>
          <div className="col-12 col-md-10">
            <form onSubmit={this.handleUserSubmit} className="input-group  flex-column">
              <div className="form-group ">
                <div className="input-group  w-100 flex-row">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="input-group  w-100 flex-row">
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handleUserNameChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="input-group  w-100 flex-row">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
              <div className="form-group  ">
                <div className="input-group  w-100 flex-row">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handlePasswordChange} />
                </div>
              </div>
              <div className="form-group ">
                <div className="input-group text-center w-100 flex-row">
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handleVerifypasswordChange}
                  />
                </div>
              </div>
              <ul className="passwordList text-left"><u>Password must contain:</u>
                <li>Lowercased Letter</li>
                <li>Uppercased Letter</li>
                <li>A Number</li>
              </ul>
              <div className="input-group-append flex-column w-100 justify-content-center align-items-center">
                <button
                  type="submit"
                  className="glow-on-hover  rounded ">
                    Create Account
                </button>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn my-2 signup-button rounded ">
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
