import React, { Component } from 'react';

const leagues = [{ id: 1, name: "Sigma Pi Championship" }, { id: 2, name: "Cardinal Championship"}];

export default class LeagueFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { leagues: [] };
  }

  componentDidMount() {
    this.setState({ leagues: leagues });
  }

  changeLeague(event) {
    event.preventDefault();
    const target = event.target;
    this.props.leagueChanged(target.value);
  }

  render() {
    const leagueSelect = this.state.leagues.map((league) => {
      return (
        <option key={league.id} value={league.name}>
          {league.name}
        </option>
      );
    });
    return (
      <div className="col-sm-4 text-left row" style={{ marginBottom: "10px", marginTop: "10px"} }>
        <select onChange={(event) => this.changeLeague(event) }>{leagueSelect}</select>
      </div>
    )
  }
}