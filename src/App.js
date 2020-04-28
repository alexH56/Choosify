import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const yelp = require('./yelpFusionClient');

const apiKey = process.env.REACT_APP_YELP_API_KEY;

const client = yelp.client(apiKey);

class App extends Component {
  state = {
    searchParameters: {
      limit: 50,
      offset: 0,
      term: 'restaurants',
      location: 'Louisville, KY',
      sort_by: 'rating'
    },
    searchResults: [],
    top: 2
  }

  getRestaurants = async () => {
    let fullRestaurantList = [];
    for (let i = 0; i < this.state.top; i++) {
      await client.search(this.state.searchParameters)
      .then(res => {
        fullRestaurantList = fullRestaurantList.concat(res.jsonBody.businesses);
      
        this.setState(prevState => ({
          searchParameters: {
            ...prevState.searchParameters,
            offset: (prevState.searchParameters.offset + 20),
          }
        }))
      })
      .catch(e => {
        console.log(e);
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
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => this.getRestaurants()}>
            Load stuff
          </button>
        </header>
      </div>
    );
  }
}

export default App;
