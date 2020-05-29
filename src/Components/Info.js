import React, { Component } from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import zero from '../Yelp_Stars/0.png';
import one from '../Yelp_Stars/1.png';
import onehalf from '../Yelp_Stars/1half.png';
import two from '../Yelp_Stars/2.png';
import twohalf from '../Yelp_Stars/2half.png';
import three from '../Yelp_Stars/3.png';
import threehalf from '../Yelp_Stars/3half.png';
import four from '../Yelp_Stars/4.png';
import fourhalf from '../Yelp_Stars/4half.png';
import five from '../Yelp_Stars/5.png';

import zeroLarge from '../Yelp_Stars/0-LG.png';
import oneLarge from '../Yelp_Stars/1-LG.png';
import onehalfLarge from '../Yelp_Stars/1half-LG.png';
import twoLarge from '../Yelp_Stars/2-LG.png';
import twohalfLarge from '../Yelp_Stars/2half-LG.png';
import threeLarge from '../Yelp_Stars/3-LG.png';
import threehalfLarge from '../Yelp_Stars/3half-LG.png';
import fourLarge from '../Yelp_Stars/4-LG.png';
import fourhalfLarge from '../Yelp_Stars/4half-LG.png';
import fiveLarge from '../Yelp_Stars/5-LG.png';

class Info extends Component {
  render () {
    const restaurant = this.props.info;
    const reviews = this.props.reviews;

    const categories = this.props.info.categories.map(category => category.title).join(', ');
    const openNow = this.props.info.hours[0].is_open_now;

    const stars = (rating, size) => {
      const icons = {
        0: function () {
          return zero;
        },
        1: function () {
          return one;
        },
        1.5: function () {
          return onehalf;
        },
        2: function () {
          return two;
        },
        2.5: function () {
          return twohalf;
        },
        3: function () {
          return three;
        },
        3.5: function () {
          return threehalf;
        },
        4: function () {
          return four;
        },
        4.5: function () {
          return fourhalf;
        },
        5: function () {
          return five;
        }
      };

      const iconsLG = {
        0: function () {
          return zeroLarge;
        },
        1: function () {
          return oneLarge;
        },
        1.5: function () {
          return onehalfLarge;
        },
        2: function () {
          return twoLarge;
        },
        2.5: function () {
          return twohalfLarge;
        },
        3: function () {
          return threeLarge;
        },
        3.5: function () {
          return threehalfLarge;
        },
        4: function () {
          return fourLarge;
        },
        4.5: function () {
          return fourhalfLarge;
        },
        5: function () {
          return fiveLarge;
        }
      };

      if (size === 'LG') {
        return iconsLG[rating]();
      } else {
        return icons[rating]();
      }
    };

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
      <div className='App'>
        <header className='App-header'>

          <div>
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image_url} alt='image of restaurant' />
            <h3>
              <img src={stars(restaurant.rating, 'LG')} />
              <span>  {`${restaurant.review_count} Reviews`}</span>
            </h3>
            <h3>{`${restaurant.price}  ·  ${categories}`}</h3>
            <div className='hoursOfOperation'>
              <ul className='days'>{
                days.map((day, index) => (
                  <li key={index}>{`${day}: `}</li>
                ))
              }
              </ul>
              <ul className='times'>{
                days.map((day, index) => (
                  <li key={index * 7} className='time'>{`${startHours[index] ? startHours[index] : 'Closed'}${endHours[index] ? ' - ' + endHours[index] : ''}`}</li>
                ))
              }
              </ul>
            </div>
            <div className='reviews'>
              <h3><img src={stars(reviews[0].rating, 'SM')} /> - {reviews[0].user.name}</h3>
              <p>{reviews[0].text}</p>
              <Link to={`${this.props.match.url}/reviews`}>See more reviews</Link>
            </div>
          </div>

        </header>
      </div>
    );
  }
}

export default Info;
