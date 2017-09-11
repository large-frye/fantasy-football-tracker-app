import React, { Component } from 'react';
import './App.css';
import './static/css/bootstrap-4.0.0-beta/dist/css/bootstrap.min.css';
import './components/core/Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/core/Home';
import Header from './components/core/Header';
import PlayerForm from './components/players/PlayerForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/player/add" component={PlayerForm} />
        </div>
      </Router>
    );
  }
}

export default App;
