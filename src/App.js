import React, { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import LocationForm from './Components/LocationForm';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import Reviews from './Components/Reviews';
import Error from './Components/Error'

import zero from './Yelp_Stars/0.png';
import one from './Yelp_Stars/1.png';
import onehalf from './Yelp_Stars/1half.png';
import two from './Yelp_Stars/2.png';
import twohalf from './Yelp_Stars/2half.png';
import three from './Yelp_Stars/3.png';
import threehalf from './Yelp_Stars/3half.png';
import four from './Yelp_Stars/4.png';
import fourhalf from './Yelp_Stars/4half.png';
import five from './Yelp_Stars/5.png';
import zeroLarge from './Yelp_Stars/0-LG.png';
import oneLarge from './Yelp_Stars/1-LG.png';
import onehalfLarge from './Yelp_Stars/1half-LG.png';
import twoLarge from './Yelp_Stars/2-LG.png';
import twohalfLarge from './Yelp_Stars/2half-LG.png';
import threeLarge from './Yelp_Stars/3-LG.png';
import threehalfLarge from './Yelp_Stars/3half-LG.png';
import fourLarge from './Yelp_Stars/4-LG.png';
import fourhalfLarge from './Yelp_Stars/4half-LG.png';
import fiveLarge from './Yelp_Stars/5-LG.png';

const yelp = require('./yelpFusionClient');
const apiKey = process.env.REACT_APP_YELP_API_KEY;
const client = yelp.client(apiKey);

class App extends Component {
  state = {
    searchParameters: {
      limit: 50,
      offset: 0,
      term: 'restaurants',
      sort_by: 'rating',
      location: ''      
    },
    searchResults: [],
    info: '',
    reviews: '',
    chosenRestaurant: '',
    numOfPages: 2
  }

  getRestaurant = async (location) => {
    this.clearDetails();
    if(location !== this.state.searchParameters.location) {     // checks submission against current location to avoid unnecessary API calls
      this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            location: location
          }
      }))
      
      await this.getList();          
    }    
    this.pickRandom();
  }

  getList = async () => {      // retrieves list of restaurants accoring to search parameters in state

    let fullRestaurantList = [];

    for (let i = 0; i < this.state.numOfPages; i++) {     // loops to accumulate desired number of restaurants (currently just list of 100) from multiple API calls
      await client.search(this.state.searchParameters)
      .then(res => {
        fullRestaurantList = fullRestaurantList.concat(res.jsonBody.businesses);

        this.setState(prevState => ({     // increments offset by limit value to fetch next page of results
          searchParameters: {
            ...prevState.searchParameters,
            offset: (prevState.searchParameters.offset + this.state.searchParameters.limit),
          }
        }))
      })
      .catch(err => {
        console.log(`${err}`);
      });
    }
    this.setState({ searchResults: fullRestaurantList })
    // console.log(fullRestaurantList)
  }

  pickRandom = async () => {      // selects random restaurant from list    
    let restaurantList = this.state.searchResults;
    let theChosenOne = restaurantList[Math.floor(Math.random()*restaurantList.length)];
    console.log(theChosenOne.id)
    this.setState({ chosenRestaurant : theChosenOne.id })
  }

  getInfo = async (restaurantID) => {     // retrieves detailed data for restaurant chosen by "pickRandom()"
    let info = [];    
    await client.business(restaurantID)
        .then(res => {
          info = res.jsonBody;
          this.setState({ info : info })
        })
        .catch(err => {
        console.log(`${err}`);
        })
    
    console.log(this.state.info);
  }

  getReviews = async (restaurantID) => {      // retrieves detailed data for restaurant chosen by "pickRandom()"
    let reviews = [];
    await client.reviews(restaurantID)
      .then(res => {
        reviews = res.jsonBody.reviews;
        this.setState({ reviews : reviews })
      })
      .catch(err => {
      console.log(`${err}`);
      });

    // console.log(this.state.reviews);
  }  

  clearDetails = () => {      // empties state to reset loader animation
    this.setState({ info: ''});
    this.setState({ reviews: '' });
  }

  setRestaurant = (id) => {     // hacky workaround for if a user enters url with ID instead of pressing button
    this.setState({ chosenRestaurant : id })     
  }

  stars = (rating, size) => {   // returns image of stars based on rating value
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

  render () {

    const chosenRestaurant = this.state.chosenRestaurant;

    return (
      <Router>
        <div className='App'>
          <header>
            <div className='banner'>Choosify</div>
            <LocationForm
              userLocation={this.state.searchParameters.location}
              getRestaurant={this.getRestaurant} 
            />
          </header>

          {chosenRestaurant ?
              <Redirect to={`/restaurant/${chosenRestaurant}`} />
            :
              <Redirect to='/home' />
          }          
            
          <Switch>

            <Route
              exact path='/home'
              render={(props) =>
              <Home />}
            />

            <Route
              exact path='/restaurant/:id'
              render={(props) => 
              <Restaurant
                stars={this.stars}                
                chosenRestaurant={this.state.chosenRestaurant}
                pickRandom={this.pickRandom}
                getInfo={this.getInfo}
                getReviews={this.getReviews}
                setRestaurant={this.setRestaurant}
                info={this.state.info}
                reviews={this.state.reviews}
                {...props}
              />}
            />

            <Route
              path='/restaurant/:id/reviews'
              render={(props) => 
              <Reviews
                info={this.state.info}
                stars={this.stars}           
                reviewList={this.state.reviews}
                {...props}
              />}
            />

            <Route
              render={(props) =>
              <Error />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
