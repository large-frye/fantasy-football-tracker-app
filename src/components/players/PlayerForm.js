import React, { Component } from 'react';
import axios from 'axios';
import config from '../../static/config/app.json';

const newPlayer = { player: { firstName: "", lastName: "", leagueName: "", leagueType: "espn" } };
const initPlayer = { player: { firstName: "", lastName: "", leagueName: "", leagueType: "espn" } };

export default class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = newPlayer;
    this.fields = {};
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const player = this.state.player;
    player[name] = value;
    this.setState(player);
  }

  saveForm() {
    axios.post(config.origin + config.endpoints.save, this.state)
      .then((response) => {
        this.setState( { playerSaved: true, player: {} });
        this.clearInputs();
      });
  }

  clearInputs() {
    Object.keys(this.fields).forEach((key) => {
      const item = this.fields[key];
      item.value = initPlayer.player[key];
    });
  }

  render() {
    let alert = "";
    if (this.state.playerSaved) {
      alert = (<div className="alert alert-success">Player was added.</div>);
    }

    return (
      <div style={ { padding: "25px" } }>
        <div>{alert}</div>
        <form className="form">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-8">
              <input type="text" name="firstName" ref={(el) => { this.fields.firstName = el }} onChange={(event) => this.handleInputChange(event)} className="form-control" placeholder="First Name"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-8">
              <input type="text" name="lastName" ref={(el) => { this.fields.lastName = el }}
                     onChange={(event) => this.handleInputChange(event)}  className="form-control" placeholder="Last Name"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              League Name
            </label>
            <div className="col-sm-8">
              <input type="text" name="leagueName" ref={(el) => { this.fields.leagueName = el }}
                     onChange={(event) => this.handleInputChange(event)} className="form-control" placeholder="League Name"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              League Type
            </label>
            <div className="col-sm-8">
              <select name="leagueType" className="form-control" ref={(el) => { this.fields.leagueType = el }}
                      onChange={(event) => this.handleInputChange(event)}>
                <option value="espn">Espn</option>
                <option value="yahoo">Yahoo</option>
              </select>
            </div>
          </div>

        </form>

        <button type="button" className="btn btn-primary" onClick={(event) => this.saveForm(event)}>Add Player</button>
      </div>
    );
  }
}