import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

class Info extends Component {
  componentDidMount () {
    const openNow = this.props.info.hours[0].is_open_now;
    console.log(openNow);

    const startHours = this.props.info.hours[0].open.map(day => {
      let time = parseInt(day.start, 10) / 100;
      if (time == 0) {
        time = '12am';
      } else if (time < 12) {
        time = `${time}am`;
      } else if (time === 12) {
        time = '12pm';
      } else {
        time = `${time % 12}pm`;
      }

      let formattedTime;
      if (time.length < 4) {
        formattedTime = time.substr(0, 1) + ':00' + time.substr(1);
      } else {
        formattedTime = time.substr(0, 2) + ':00' + time.substr(2);
      }

      return formattedTime;
    });
    //   console.log(startHours);const startHours = this.props.info.hours[0].open.map(day => {
    //     let time = parseInt(day.start, 10) / 100;
    //     if (time == 0) {
    //       time = `${time + 1200}am`;
    //     } else if (time <= 1200) {
    //       time = `${time}am`;
    //     } else {
    //       time = `${time - 1200}pm`;
    //     }
    //     const formattedTime = time.substr(0, 2) + ':' + time.substr(2);
    //     return formattedTime;
    //   });
    console.log(startHours);
  }

  render () {
    const restaurant = this.props.info;
    const reviews = this.props.reviews;
    const categories = this.props.info.categories.map(category => category.title).join(', ');

    const openNow = this.props.info.hours[0].is_open_now;
    const startHours = this.props.info.hours[0];

    return (
      <div className='App'>
        <header className='App-header'>

          <div>
            <p>{restaurant.name}</p>
            <p>{`${restaurant.rating} ${restaurant.review_count}`}</p>
            <img src={restaurant.image_url} alt='image of restaurant' />
            <p>{`${restaurant.price} * ${categories}`}</p>
            <p>{}</p>
            <Link to={`${this.props.match.url}/reviews`}>See more reviews</Link>
          </div>

        </header>
      </div>
    );
  }
}

export default Info;
