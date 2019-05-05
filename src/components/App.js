import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';
import Maps from './Maps/map';
import Trivia from './Trivia';

class App extends React.Component {
  state = { currentLocation: '', destination: '', transportation: '' };

  componentDidMount = () => { };

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
        <Maps>Maps</Maps>
        <Trivia />
      </div>
    );
  }
}

export default App;
