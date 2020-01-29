import React from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

const tabs = [{
  path: '/public-page',
  icon: 'fa-home'
}, {
  path: '/myRecipes',
  icon: 'fa-star'
}, {
  path: '/mealplan',
  icon: 'fa-clipboard-list'
}, {
  path: '/account',
  icon: 'fa-user'
}
];

function renderTab({ path, icon }, index) {
  const { pathname } = useLocation();
  const isCurrentPath = pathname === path;
  const color = isCurrentPath ? 'blue' : 'black';
  return (
    <Link className="black" to={path} key={index}>
      <div className="col-3 w-25">
        <i className={`fas ${icon} ${color} text-center`}></i>
      </div>
    </Link>
  );
}

function NavBar() {
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
      {tabs.map(renderTab)}
    </div>

  );
}
export default NavBar;
