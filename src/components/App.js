import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';
import Maps from './Maps/map';
import Trivia from './Trivia';
import './app.css';

class App extends React.Component {
  state = { currentLocation: '', destination: '', transportation: '' };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  };

  showPosition = position => {
    this.setState({
      currentLocation: `${position.coords.latitude},${
        position.coords.longitude
      }`
    });
  };

  render() {
    return (
      <div id='outer-container' className='app'>
        <h1>Carbon Footprint Calculator</h1>
        <div className='container'>
          <Sidebar
            onChange={(fieldName, destination) =>
              this.setState({ [fieldName]: destination })
            }
            onClick={transportation => this.setState({ transportation })}
            currentLocation={this.state.currentLocation}
            destination={this.state.destination}
            transportation={this.state.transportation}
          />
          <div className='map'>
            <Maps>Maps</Maps>
          </div>
        </div>
        <Trivia />
      </div>
    );
  }
}

export default App;
