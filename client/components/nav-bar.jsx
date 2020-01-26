import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import AppContext from '../lib/context';

export default class NavBar extends React.Component {

  render() {

    return (
      <div className="
        row
        nav-bar
        justify-content-between
        flex-row
        position-fixed
        w-100
        px-3
        align-items-center
        text-light
        "
      >
        <Link className="black" to={'/public-page'}>
          <div className="col-3 w-25">
            <i className="fas fa-home text-center"></i>
          </div>
        </Link>
        <Link className="black" to={'/myRecipes'}>
          <div className=" col-3 w-25">
            <i className="fas fa-star text-center"></i>
          </div>
        </Link>
        <Link className="black" to={'/mealplan'}>
          <div className="col-3">
            <i className="fas fa-clipboard-list"></i>
          </div>
        </Link>
        {/* <Link className="black" to={'/'}> */}
        <div className="black col-3">
          <i className="fas fa-user"></i>
        </div>
        {/* </Link> */}
      </div>

    );
  }

}
