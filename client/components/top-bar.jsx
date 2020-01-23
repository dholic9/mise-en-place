import React from 'react';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="title p-3 mb-3 d-flex row bg-info">
        <div className="title-text col-8 text-right text-right">
          My Recipes
        </div>
        <i className="fas fa-bars col-4 text-right"></i>
      </div>
    );
  }
}
