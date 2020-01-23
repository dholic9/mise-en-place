import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
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

  handleUserSubmit() {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      password: this.state.password
    };
    this.context.handleUserLogin(user);
  }

  render() {
    return (
      <div className="container d-flex ratatouille flex-column ">
        <div className="row justify-content-center  mt-2 mb-5">
          <img src="/images/logo1.png" height="150" width="200" alt="loading"/>

        </div>
        <div className="row pt-4 mt-5 justify-content-around text-light ">
          <h1>Login</h1>
          <div className="col-12 ">
            <form onSubmit={this.handleUserSubmit} className="input-group  flex-column">
              <div className="form-group my-4">
                <div className="input-group  w-100 flex-column">
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control w-100"
                    required
                    autoFocus
                    onChange={this.handleUserNameChange}
                  />
                </div>
              </div>

              <div className="form-group my-4 ">
                <div className="input-group align-items-center">
                  <input
                    type="text"
                    placeholder="Password"
                    className="form-control w-100"
                    required
                    autoFocus
                    onChange={this.handlePasswordChange}/>
                </div>
              </div>

              <div className="input-group-append flex-column w-100 justify-content-center align-items-center">
                {/* <Link to="/public-page"> */}
                <button
                  type="submit"
                  className="btn btn-primary rounded my-2">
                    Log In
                </button>
                {/* </Link> */}
                <Link to="/sign-up">
                  <button
                    type="button"
                    className="btn btn-primary rounded my-2">
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
