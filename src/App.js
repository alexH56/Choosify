import React, { Component } from 'react';
import logo from './logo.svg';
import loader from './loader.svg'
import './App.css';
import LocationForm from './Components/LocationForm';
import Details from './Components/Details'

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
    numOfPages: 2,
    searchCounter: 0,
    isLoading: true
  }

  chooseRestaurant = async (location) => {     // sets 'location' in state to value of LocationForm

    this.loaderToggle(true);     // resets to display loading animation in "Details" component

    this.clearDetails();      // enables component update to un-toggle the loader once "info" and "reviews" repopulate

    this.setState(prevState => ({     // increments searchCounter to trigger "Details" update
      searchCounter: (prevState.searchCounter + 1),
    }))

    if(location !== this.state.searchParameters.location) {     // checks submission against current location to avoid unnecessary API calls
      await this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            location: location,
          }
      }))      

      this.getRestaurants();

    } else{
      this.pickRandom();
    }
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
            offset: (prevState.searchParameters.offset + 50),
          }
        }))
      })
      .catch(err => {
        console.log(`Error: ${err}.`);
      });
    }
    await this.setState({ searchResults: fullRestaurantList })
    console.log(fullRestaurantList)
    this.pickRandom();
  }

  pickRandom = async () => {      // selects random restaurant from list
    
    let restaurantList = this.state.searchResults;
    let theChosenOne = restaurantList[Math.floor(Math.random()*restaurantList.length)];
    console.log(theChosenOne);
    
    this.getInfo(theChosenOne.id);
    this.getReviews(theChosenOne.id);
  }

  getInfo = async (restaurantID) => {     // retrieves detailed data for restaurant chosen by "pickRandom()"
    let info = [];
    
    await client.business(restaurantID)
        .then(res => {
          info = res.jsonBody;
          this.setState({ info : info })
        })
        .catch(err => {
        console.log(`Error: ${err}.`);
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
      console.log(`Error: ${err}.`);
      });

    console.log(reviews);
  }

  clearDetails = () => {
    this.setState({ info: ''});
    this.setState({ reviews: '' });
  }

  loaderToggle = (boolean) => {
    this.setState({ isLoading: boolean })
  }

  componentDidUpdate() {
    if (this.state.info && this.state.reviews && this.state.isLoading) {
      this.loaderToggle(false);
    }
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          
          <LocationForm 
          chooseRestaurant={this.chooseRestaurant} 
          location={this.state.searchParameters.location}  
          />

          {(this.state.searchCounter > 0)?
            
            <Details
                searchCounter={this.state.searchCounter}
                isLoading={this.state.isLoading}    
              />  

          :null}

        </header>
      </div>
    );
  }
}

export default App;
