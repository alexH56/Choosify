import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import LocationForm from './Components/LocationForm';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import Reviews from './Components/Reviews';

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
      await this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            location: location
          }
      }))
      
      await this.getList();
          
    }
    
    this.pickRandom();
    // this.getInfo(chosenOne.id);
    // this.getReviews(chosenOne.id);
  }

  getList = async () => {      // retrieves list of restaurants accoring to search parameters in state

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
    console.log(theChosenOne.id)
    this.setState({ chosenRestaurant : theChosenOne.id })
    
    // return(theChosenOne)
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

    console.log(this.state.reviews);
  }  

  clearDetails = () => {      // empties state to reset loader animation
    this.setState({ info: ''});
    this.setState({ reviews: '' });
  }

  setRestaurant = (id) => {     // hacky workaround for if a user enters url with ID instead of pressing button
    this.setState({ chosenRestaurant : id })     
  }

  render () {

    const chosenRestaurant = this.state.chosenRestaurant;

    return (
      <Router>
        <div className='App'>
          <header className='App-header'>
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
              path='/home'
              render={(props) =>
              <Home
                // userLocation={this.state.searchParameters.location}
                // getRestaurant={this.getRestaurant}                
                // {...props}
              />}
            />

            <Route
              exact path='/restaurant/:id'
              render={(props) => 
              <Restaurant
                // userLocation={this.state.searchParameters.location}
                // getRestaurant={this.getRestaurant}
                chosenRestaurant={this.state.chosenRestaurant}
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
                reviewList={this.state.reviews}
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
