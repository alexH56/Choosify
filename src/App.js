import React, { Component } from 'react';
import logo from './logo.svg';
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
    numOfPages: 2,
    searchCounter: 0
  }

  chooseRestaurant = async (location) => {     // sets 'location' in state to value of LocationForm
  
    this.setState(prevState => ({     // increments searchCounter to trigger "Details" update
      searchParameters: {
        ...prevState.searchParameters,
        offset: (prevState.searchParameters.offset + 50),
      }
    }))

    if(location !== this.state.searchParameters.location) {     // checks submission against current location to avoid unnecessary API calls
      await this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            location: location,
          }
      }))
      
      this.getRestaurants();
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
    this.setState({ searchResults: fullRestaurantList })
    console.log(fullRestaurantList)
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

          {(this.state.searchCounter > 1)?
          
            <Details 
              searchResults={this.state.searchResults}
              searchCounter={this.state.searchCounter}
            />

          :null}

        </header>
      </div>
    );
  }
}

export default App;
