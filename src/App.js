import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Restaurant from './Components/Restaurant';
import Home from './Components/Home';
import LocationForm from './Components/LocationForm'

const yelp = require('./yelpFusionClient');

const apiKey = 'aMWegcJjE6biL0jlEF51GR3bPyDpPYdYbko0VdeiQfOfRKK8kCOTTqx3DcyK2Ac9UGitFPHw_bUQgZuJE8ZQmeV3L1Fv2UGjxGSXK_zf3lf8lang3riirpVgq0dwXnYx';

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
    numOfPages: 2
  }

  getAllData = async (location) => {     // primary logic flow of app functionality
    this.clearDetails();
    if(location !== this.state.searchParameters.location) {     // checks submission against current location to avoid unnecessary API calls
      await this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            location: location
          }
      }))
      
      await this.getRestaurants();
          
    }
    
    let chosenOne = await this.pickRandom();
    this.getInfo(chosenOne.id);
    this.getReviews(chosenOne.id);
  }

  getRestaurants = async () => {      // retrieves list of restaurants accoring to search parameters in state

    let fullRestaurantList = [];

    for (let i = 0; i < this.state.numOfPages; i++) {     // loops to accumulate desired number of restaurants from multiple API calls
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
    await this.setState({ searchResults: fullRestaurantList })
    console.log(fullRestaurantList)
  }

  pickRandom = async () => {      // selects random restaurant from list    
    let restaurantList = this.state.searchResults;
    let theChosenOne = restaurantList[Math.floor(Math.random()*restaurantList.length)];
    console.log(theChosenOne);
    return(theChosenOne)
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
    
    console.log(info);
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

    console.log(reviews);
  }  

  clearDetails = () => {      // empties state to reset loader animation
    this.setState({ info: ''});
    this.setState({ reviews: '' });
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <header className='App-header'>
            <LocationForm
              userLocation={this.state.searchParameters.location}
              getAllData={this.getAllData} 
            />
          </header>
       
          {this.state.searchParameters.location ?
              <Redirect to='/restaurant' />
            :
              <Redirect to='/home' />
          }          
            
          <Switch>
            <Route
              path='/home'
              render={(props) =>
              <Home
                userLocation={this.state.searchParameters.location}
                getAllData={this.getAllData}                
                {...props}
              />}
            />

            <Route
              path='/restaurant'
              render={(props) => 
              <Restaurant
                userLocation={this.state.searchParameters.location}
                getAllData={this.getAllData}
                info={this.state.info}
                reviews={this.state.reviews}
                clearDetails={this.clearDetails}
                {...props}
              />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
