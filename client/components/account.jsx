import React from 'react';
import AppContext from '../lib/context';
import TopBar from './top-bar';
import NavBar from './nav-bar';
import Swal from 'sweetalert2';
export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data });
      })
      .catch(err => console.error(err));
  }

  logout() {
    fetch('/api/users/logout')
      .then(response => response.json())
      .then(data => {
        Swal.fire('You have logged out!');
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <React.Fragment>
        <TopBar title={'Account Details'} displayIcon={true}/>
        <div className="
                container
                fadeIn
                p-0
                mt-5
                pt-4
                flex-column
                align-items-center
        ">
          <div className="row mt-4">
            <div className="col-12  flex-column text-center">
              <h2 className="border-bottom mb-4">Account Information</h2>
              {this.state.user.image
                ? <img className="mt-2  mb-4 account-icon" src={this.state.user.image} alt=""/>
                : <img className="mt-2  mb-4 account-icon" src={'/images/sadPatrick.gif'} alt="" />}
            </div>
          </div>
          <div className="row border-bottom py-4 mt-5 mb-3 flex-column align-items-center text-center">
            <h4><u>Name</u>:  {this.state.user.name} </h4>
            <h4><u>User Name</u>:  {this.state.user.userName}</h4>
            <h4><u>Email</u>: {this.state.user.email}</h4>
          </div>
          <div className="row">
            <div className="col-12 logoutButton text-center ">
              <button type="button" onClick={this.logout} className="logoutButton glow-on-hover">Log Out</button>

            </div>
          </div>
          <div className="row">
            <NavBar />
          </div>
        </div>
      </React.Fragment>
    );
  }

}

Account.contextType = AppContext;
