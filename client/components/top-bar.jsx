import React from 'react';
import { Link } from 'react-router-dom';
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const iconDisplay = this.props.displayIcon ? <i className="fas fa-utensils col-4 text-right"/> : null;
    return (
      <div className="title p-3 mb-3 d-flex row bg-info">
        <div className="title-text col-8 text-right text-right">
          {this.props.title}
        </div>
        <Link to={'/mealplan'}>
          {iconDisplay}
        </Link>
      </div>
    );
  }
}
