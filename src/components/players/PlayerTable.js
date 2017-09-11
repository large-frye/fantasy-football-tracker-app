import React, { Component } from 'react';
import './PlayerTable.css';

export default class PlayerTable extends Component {

  constructor(props) {
    super(props);
    this.state = { players: [], paid: [] };

    // set checked values
  }

  componentDidMount() {
    this.props.axios.get(this.props.config.origin + this.props.config.endpoints.get).then((response) => {
      this.setState({ players: response.data });
      response.data.forEach((player) => {
        const currentState = this.state;
        currentState.paid.push({
          [player._id]: player.status
        });
        this.setState(currentState);
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.league) {
      this.props.axios.get(this.props.config.origin + this.props.config.endpoints.getPlayersByLeague + nextProps.league)
        .then((response) => {
          this.setState({ players: response.data });
          // response.data.forEach((player) => {
          //   console.log(player);
          // })
        })
    }
  }

  userPaid(event, player) {
    const target = event.target;
    if (target.checked) {
      // updated player
    }
  }

  didUserPay(fieldName, status) {
    if (status === 'NOT_PAID') {
      return fieldName === 'no';
    } else if (status === 'PAID') {
      return fieldName === 'yes';
    }
  }

  render() {
    if (this.state.players.length > 0) {
      const playerList = this.state.players.map((player, index) => {
        console.log(this.state.paid[player._id], player._id);
        return (
          <tr key={index}>
            <td className="text-left">
              {player.firstName}
            </td>
            <td className="text-left">
              {player.lastName}
            </td>
            <td className="text-left">
              {player.status}
            </td>
            <td className="text-left">
              Yes <input type="radio" checked={this.state.paid[player._id] === 'PAID'} value="paid" />
              &nbsp;&nbsp;No <input type="radio" checked={this.state.paid[player._id] === 'NOT_PAID'} value="not_paid" />
            </td>
          </tr>
        )
      });

      return (
        <table className="table">
          <thead>
          <tr>
            <th scope="row">First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Paid</th>
          </tr>
          </thead>
          <tbody>
            {playerList}
          </tbody>
        </table>
      );

    } else {
      return (<div className="alert alert-warning">No Players were found for {this.props.league}!</div>);
    }
  }
}