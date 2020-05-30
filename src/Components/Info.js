import React, { Component } from 'react';
import '../App.scss';
import {
  Link
} from 'react-router-dom';

import logo from '../Yelp_Logo.svg';

class Info extends Component {
  render () {
    const restaurant = this.props.info;
    const reviews = this.props.reviews;
    const stars = this.props.stars;
    const categories = this.props.info.categories.map(category => category.title).join(', ');
    // const openNow = this.props.info.hours[0].is_open_now;

    const startHours = this.props.info.hours[0].open.map(day => {
      let hour = parseInt(day.start.slice(0, -2), 10);
      const minutes = day.start.slice(-2);
      let meridiem;

      if (hour < 12) {
        meridiem = 'am';
      } else {
        meridiem = 'pm';
      }

      if (hour > 12) {
        hour = hour % 12;
      } else if (hour === 0) {
        hour += 12;
      }

      const formattedTime = `${hour.toString()}:${minutes}${meridiem}`;
      return formattedTime;
    });

    const endHours = this.props.info.hours[0].open.map(day => {
      let hour = parseInt(day.end.slice(0, -2), 10);
      const minutes = day.end.slice(-2);
      let meridiem;

      if (hour < 12) {
        meridiem = 'am';
      } else {
        meridiem = 'pm';
      }

      if (hour > 12) {
        hour = hour % 12;
      } else if (hour === 0) {
        hour += 12;
      }

      const formattedTime = `${hour.toString()}:${minutes}${meridiem}`;
      return formattedTime;
    });

    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    return (
      <div className='info-container'>

        <h1>{restaurant.name}</h1>

        <img className='main-img' src={restaurant.image_url} alt='restaurant' />

        <div className='aligner'>
          <img src={stars(restaurant.rating, 'LG')} alt='rating displayed in number of stars' />
          <h3 className='faded'>{`${restaurant.review_count} reviews`}</h3>
        </div>

        <h3 id='categories'>{`${restaurant.price}  ·  ${categories}`}</h3>

        <h3 id='hours'>Hours
          {/* {openNow ? <span className='open'>Open now!</span> : <span className='close'>Closed</span>} */}
        </h3>

        <ul className='days'>{
          days.map((day, index) => (
            <li key={index}>{`${day}: `}{`${startHours[index] ? startHours[index] : 'Closed'}${endHours[index] ? ' - ' + endHours[index] : ''}`}</li>
          ))
        }
        </ul>

        <div className='reviews'>
          <h3><img src={stars(reviews[0].rating, 'SM')} alt='rating displayed in number of stars' /> - {reviews[0].user.name}</h3>
          <p><i>"{reviews[0].text}"  <Link to={`${this.props.match.url}/reviews`}>(see more reviews)</Link></i></p>
        </div>

        <div id='link'>
          <a href={this.props.info.url}>More info on</a>
          <a href={this.props.info.url}><img src={logo} alt='yelp logo' /></a>
        </div>
      </div>

    );
  }
}

export default Info;
