import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import loader from '../loader.svg';

import Info from './Info';

class Restaurant extends Component {
  componentDidMount () {
    if (!this.props.chosenRestaurant) {
      this.props.setRestaurant(this.props.match.params.id);
    }
    this.props.getInfo(this.props.match.params.id);
    this.props.getReviews(this.props.match.params.id);
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id && !this.props.reviews) {
      this.props.getInfo(this.props.match.params.id);
      this.props.getReviews(this.props.match.params.id);
    }
  }

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

          {(reviews && info)
            ? <Info
              info={info}
              reviews={reviews}
              pickRandom={this.props.pickRandom}
              match={this.props.match}
            />

            : <img src={loader} alt='loading' />}

        </header>
      </div>
    );
  }
}

export default Restaurant;
