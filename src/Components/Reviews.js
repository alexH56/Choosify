import React, { Component } from 'react';
import '../App.scss';
import { PropTypes } from 'prop-types';

import logo from '../Yelp_Logo.svg';

class Reviews extends Component {
  render () {
    const reviewList = this.props.reviewList;
    const stars = this.props.stars;
    const dateFormatter = date => `${date.slice(5, 10).replace('-', '/')}/${date.slice(2, 4)}`;

    return (
      <main>
        <div className='info-container'>
          {reviewList
            ? reviewList.map(review => (
              <article key={`${review.id}`}>
                <div className='aligner'>
                  <img src={stars(review.rating, 'SM')} alt='rating displayed in number of stars' />
                  <h3>{review.user.name}  <span className='faded'>{dateFormatter(review.time_created)}</span></h3>
                </div>
                <p><i>"{review.text}</i>"</p>
              </article>
            ))

            : null}
        </div>

        <div id='link'>
          <a href={this.props.info.url}>More reviews on</a>
          <a href={this.props.info.url}><img src={logo} alt='yelp logo' /></a>
        </div>

        <button className='btn' onClick={this.props.history.goBack}>Back</button>
      </main>

    );
  }
}

Reviews.propTypes = {
  reviewList: PropTypes.array // String PropType
};

export default Reviews;
