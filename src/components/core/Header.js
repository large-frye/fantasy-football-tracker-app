import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar sticky-top navbar-inverse bg-primary">
        <a className="navbar-brand text-light" href="/">Fantasy Tracker</a>

        <div className="navbar-nav">
          <a className="nav-item nav-link text-light" href="/player/add">Add Player <span className="sr-only">(current)</span></a>
        </div>
      </nav>
    )
  }
}