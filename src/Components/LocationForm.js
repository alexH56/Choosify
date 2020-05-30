import React, { Component } from 'react';
import '../App.scss';

class LocationForm extends Component {
  state = {
    value: ''
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getRestaurant(this.state.value);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          id='text' 
          type="text"
          value={this.state.value}
          onChange={this.handleValueChange}
          placeholder="Where do you live?"
        />
        
        <input 
          className='btn'
          type="submit"
          value={this.props.userLocation? "Choose again!" : "Choose!"}
        />
      </form>
    );
  }
}

export default LocationForm;
