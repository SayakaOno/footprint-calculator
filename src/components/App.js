import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';

class App extends React.Component {
  state = { currentLocation: null, destination: null, transportation: '' };

  componentDidMount = () => {};

  render() {
    return (
      <div id='outer-container' className='app'>
        <Sidebar
          onChange={(fieldName, destination) =>
            this.setState({ [fieldName]: destination })
          }
          onClick={transportation => this.setState({ transportation })}
          currentLocation={this.state.currentLocation}
          destination={this.state.destination}
          transportation={this.state.transportation}
        />
        <h1>Carbon Footprint Calculator</h1>
        <p>
          {this.state.currentLocation}, {this.state.destination}
        </p>
      </div>
    );
  }
}

export default App;
