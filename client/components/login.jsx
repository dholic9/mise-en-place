import React from 'react';
import AppContext from '../lib/context';

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

  handleUserSubmit() {
    console.log('submitted');
  }

  render() {
    return (
      <div className="container  ratatouille text-light">
        <div className="row justify-content-center title mb-2">
          <img src="/images/logo1.png" height="150" width="200" alt="loading"/>

        </div>
        <div className="row pt-4 mt-4 justify-content-around  ">
          <div className="col-12 ">
            <form onSubmit={this.handleUserSubmit} className="input-group flex-column">
              <div className="form-group my-4">
                <div className="input-group w-100 flex-column">
                  <p>User Name</p>
                  <input
                    type="text"
                    className="form-control w-100"
                    required
                    autoFocus
                    onChange={this.handleUserNameChange}
                  />
                </div>
              </div>

              <div className="form-group my-4 ">
                <div className="input-group align-items-center">
                  <p>Password</p>
                  <input
                    type="text"
                    className="form-control w-100"
                    required
                    autoFocus
                    onChange={this.handlePasswordChange}/>
                </div>
              </div>

              <div className="input-group-append flex-column w-100 justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary rounded my-2">
                  Log In
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded my-2">
                    Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    );

  }

}
