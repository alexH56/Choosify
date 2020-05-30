import React, { Component } from 'react';
import '../App.scss';

class Home extends Component {
  render () {
    return (
      <main>
        <div className='homeContainer'>
          <p>Do you struggle choosing a place to eat?</p>
          <p>Do you and your significant other go around in circles when picking a restaurant, all the while insisting "anywhere is fine...except there"?</p>
          <p>Well worry no more! Simply enter your location above and we'll choose for you. Trust in the app.</p>
        </div>
      </main>
    );
  }
}

export default Home;
