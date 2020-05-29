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
  render () {
    const restaurant = this.props.info;
    const reviews = this.props.reviews;

    const categories = this.props.info.categories.map(category => category.title).join(', ');
    const openNow = this.props.info.hours[0].is_open_now;

    const stars = (rating, size) => {
      const icons = {
        0: function () {
          return '../Yelp_Stars/0.png';
        },
        1: function () {
          return '../Yelp_Stars/1.png';
        },
        1.5: function () {
          return '../Yelp_Stars/1half.png';
        },
        2: function () {
          return '../Yelp_Stars/2.png';
        },
        2.5: function () {
          return '../Yelp_Stars/2half.png';
        },
        3: function () {
          return '../Yelp_Stars/3.png';
        },
        3.5: function () {
          return '../Yelp_Stars/3half.png';
        },
        4: function () {
          return '../Yelp_Stars/4.png';
        },
        4.5: function () {
          return '../Yelp_Stars/4half.png';
        },
        5: function () {
          return '../Yelp_Stars/5.png';
        }
      };

      const iconsLG = {
        0: function () {
          return '../Yelp_Stars/0-LG.png';
        },
        1: function () {
          return '../Yelp_Stars/1-LG.png';
        },
        1.5: function () {
          return '../Yelp_Stars/1half-LG.png';
        },
        2: function () {
          return '../Yelp_Stars/2-LG.png';
        },
        2.5: function () {
          return '../Yelp_Stars/2half-LG.png';
        },
        3: function () {
          return '../Yelp_Stars/3-LG.png';
        },
        3.5: function () {
          return '../Yelp_Stars/3half-LG.png';
        },
        4: function () {
          return '../Yelp_Stars/4-LG.png';
        },
        4.5: function () {
          return '../Yelp_Stars/4half-LG.png';
        },
        5: function () {
          return '../Yelp_Stars/5-LG.png';
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
              <span>{`${restaurant.review_count} Reviews`}</span>
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
              {/* <img src='../Yelp_Stars/0.png' alt='stars' /> */}
            </div>
          </div>

        </header>
      </div>
    );
  }
}

export default Info;
