import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';
import Maps from './Maps/map';

class App extends React.Component {
  state = { currentPosition: null, destination: null };

  componentDidMount = () => { };

  render() {
    return (
      <div id='outer-container' className='app'>
        <Sidebar onChange={destination => this.setState({ destination })} />
        <h1>Carbon Footprint Calculator</h1>
        <Maps origin='UBC' destination='University of Victoria'>Maps</Maps>
      </div>
    );
  }
}

export default App;
