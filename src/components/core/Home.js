import React, { Component } from 'react';
import PlayerTable from '../players/PlayerTable';
import LeagueFilter from '../league/LeagueFilter';
import config from '../../static/config/app.json';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { league: "" };
  }

  leagueChanged(league) {
    this.setState({ league: league });
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <LeagueFilter config={config} axios={axios} leagueChanged={(data) => this.leagueChanged(data)}/>
          <PlayerTable config={config} axios={axios} league={this.state.league} />
        </div>
      </div>
    )
  }
}