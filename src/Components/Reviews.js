import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Reviews extends Component {
//   componentDidMount () {
//     const REVIEWS = this.props.reviewList.map(review => (
//       review.text
//     ));
//     console.log(REVIEWS);
//   }

  render () {
    const reviewList = this.props.reviewList;
    return (
      <div className='App'>
        <header className='App-header'>
          {/* <ul>
            {reviewList.map(review => (
              <li key={`${review.id}`}>
                <p>{review.rating}</p>
                <p>{review.text}</p>
                <p>{review.time_created}</p>
              </li>
            ))}
          </ul> */}
          <p>Reviews</p>
        </header>

      </div>
    );
  }
}

Reviews.propTypes = {
  reviewList: PropTypes.array // String PropType
};

export default Reviews;
