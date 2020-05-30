import React, { Component } from 'react';
import '../App.scss';

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
      <main>
        {(reviews && info)
          ? <Info
            info={info}
            reviews={reviews}
            match={this.props.match}
            stars={this.props.stars}
            />

          : <img src={loader} alt='loading' />}

      </main>
    );
  }
}

export default Restaurant;
