import React from 'react';
import logo from './logo.svg';
import './App.css';

const yelp = require('yelp-fusion');

const apiKey = process.env.REACT_APP_YELP_API_KEY;

console.log(apiKey);

const searchRequest = {
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Welp!
        </a>
      </header>
    </div>
  );
}

export default App;
