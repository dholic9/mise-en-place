import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
  }

  handleUserNameChange() {
    this.setState({
      userName: event.target.value
    });
  }

  handlePasswordChange() {
    this.setState({
      password: event.target.value
    });
  }

  handleUserSubmit(event) {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      password: this.state.password
    };
    this.context.handleUserLogin(user)
      .then(() => { this.props.history.push('/public-page'); })
      .catch(err => { console.log(err); });
  }

  render() {
    return (
      <div className="container-fluid login-background fadeIn  p-0 d-flex align-items-center  flex-column ">
        <div className="row justify-content-center login-title  w-100 my-5">
          <img src="/images/new-logo.png" className = "" height="150" width="200" alt="loading"/>
        </div>
        <div className="row card intro-card flex-row justify-content-around text-light ">
          <h1 className=" text-center pink">Sign In</h1>
          <div className="col-12 ">
            <form onSubmit={this.handleUserSubmit} className="input-group  flex-column">
              <div className="form-group py-3">
                <div className="input-group  w-100 flex-row justify-content-center ">
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control text-center input-rounding  w-70"
                    required
                    autoFocus
                    onChange={this.handleUserNameChange}
                  />
                </div>
              </div>
              <div className="form-group py-2 ">
                <div className="input-group w-100 flex-row justify-content-center">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control text-center input-rounding w-70"
                    required
                    autoFocus
                    onChange={this.handlePasswordChange}/>
                </div>
              </div>
              <div className="input-group-append flex-column w-100 justify-content-center align-items-center">
                <button
                  type="submit"
                  className=" glow-on-hover  rounded my-2">
                    Log In
                </button>
                <Link to="/sign-up">
                  <button
                    type="button"
                    className=" btn signup-button rounded my-2">
                      Sign Up
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

Login.contextType = AppContext;
