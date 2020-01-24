import React from 'react';
import { Link } from 'react-router-dom';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const iconDisplay = this.props.displayIcon
      ? <i className="fas icon fa-utensils col-2 text-right"/>
      : null;
    return (
      <div className="title py-3 pl-3 mb-3 justify-content-center d-flex row bg-info">
        <div className="title-text col-12 p-0 text-center">
          {this.props.title}
        </div>
        <Link to={'/mealplan'}>
          {iconDisplay}
        </Link>
      </div>
    );
  }
}
