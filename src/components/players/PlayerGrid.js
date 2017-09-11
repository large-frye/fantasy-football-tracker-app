import React, { Component } from 'react';
import axios from 'axios';

export default class PlayerGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  componentDidMount() {
    axios.get(this.props.config.origin + this.props.config.endpoints.get).then((response) => {
      this.setState({ players: response.data });
    });
  }

  render() {

    if (this.state.players.length > 0) {
      const playerList = this.state.players.map((player) => {
        return (
          <tr>
            <td>
              {player.firstName}
            </td>
          </tr>
        )
      });
      return (
        playerList
      );
    } else {
      return (<tr><td>Loading Players</td></tr>);
    }

  }
}