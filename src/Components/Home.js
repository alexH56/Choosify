import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import LocationForm from './LocationForm.js';

class Home extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>

          <p>Home</p>

        </header>

      </div>
    );
  }
}

export default Home;
