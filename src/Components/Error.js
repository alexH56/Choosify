import React, { Component } from 'react';
import '../App.scss';

class Error extends Component {
  render () {
    return (
      <main>
        <div className='homeContainer'>
          <img src='https://media.giphy.com/media/HdkDl6LrZCWgU/giphy.gif' alt='Benedict Cumberbatch saying "oops"' />
          <p>Looks like something went wrong. Go back and try again.</p>
        </div>
      </main>
    );
  }
}

export default Error;
