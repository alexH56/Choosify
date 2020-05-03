import React, { Component } from 'react';
import '../App.css';

class LocationForm extends Component {
  state = {
    value: '',
    locationIsSet: false
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
    // this.setState({locationIsSet: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.chooseRestaurant(this.state.value);
    this.setState({locationIsSet:true})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          value={this.state.value}
          onChange={this.handleValueChange}
          placeholder="Where do you live?"
        />
        
        <input 
          type="submit"
          value={this.state.locationIsSet? "Choose again!" : "Choose!"}
        />
      </form>
    );
  }
}

export default LocationForm;
