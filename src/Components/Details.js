import React, { Component } from 'react';
import '../App.css';
import '../loader.css'

const yelp = require('../yelpFusionClient');

const apiKey = process.env.REACT_APP_YELP_API_KEY;

const client = yelp.client(apiKey);

class Details extends Component {
  state = {
    details: [],
    reviews: []
  }

  pickRandom = () => {
    let restaurantList = this.props.searchResults;
    let theChosenOne = restaurantList[Math.floor(Math.random()*restaurantList.length)];
    console.log(theChosenOne);
    
    this.getDetails(theChosenOne.id);
    this.getReviews(theChosenOne.id);
  }

  getDetails = async (restaurantID) => {
    let details = await client.business(restaurantID)
        .catch(err => {
        console.log(`Error: ${err}.`);
        });

    console.log(details);
  }

  getReviews = async (restaurantID) => {
    let reviews = await client.reviews(restaurantID)
        .catch(err => {
        console.log(`Error: ${err}.`);
        });

    console.log(reviews);
  }

  componentDidMount() {
    this.pickRandom();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchCounter !== prevProps.searchCounter) {
        this.pickRandom();
    }
  }

  render() {

    return (

        // {(this.state.details.length && this.state.reviews.length)?
        
        //     <div>
        //         <p>Details have appeared!</p>
        //     </div>
        
        // :
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>

        // }
    );
  }
}

export default Details;
