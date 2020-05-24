import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import loader from '../loader.svg';

class Restaurant extends Component {
  render () {
    const info = this.props.info;
    const reviews = this.props.reviews;

    return (
      <div className='App'>
        <header className='App-header'>

          {/* <LocationForm
            getAllData={this.props.getAllData}
            userLocation={this.props.userLocation}
          /> */}

          {reviews && info
            ? <div>Details</div>

            : <img src={loader} alt='loading' />}

        </header>
      </div>
    );
  }
}

export default Restaurant;
