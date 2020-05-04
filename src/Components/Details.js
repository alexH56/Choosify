import React, { Component } from 'react';
// import '../App.css';
import '../loader.css';
import loader from '../loader.svg';

class Details extends Component {
  render () {
    return (
      <div>
        {(this.props.isLoading === false)
          ? <p>Details have appeared!</p>
          : <img src={loader} alt='loading' />}
      </div>
    );
  }
}

export default Details;
