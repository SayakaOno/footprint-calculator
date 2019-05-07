import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';
import Maps from './Maps/map';
import Trivia from './Trivia';
import './app.css';

class App extends React.Component {
  state = {
    initialCenter: null,
    currentLocation: '',
    destination: '',
    transportation: '',
    amount: null,
    renderMap: null,
    renderMapWithTMode: null
  };

  componentDidMount = () => {
    this.setState({ renderMap: null, renderaMapWithtravelMode: null });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.setState({
        initialCenter: {
          lat: 49.2606,
          lng: -123.246
        }
      });
    }
  };

  showPosition = position => {
    this.setState({
      currentLocation: `${position.coords.latitude},${
        position.coords.longitude
      }`,
      initialCenter: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };

  setEmittedCO2 = amount => {
    this.setState({ amount });
  };

  render() {
    return (
      <div id='outer-container' className='app'>
        <div className='container'>
          <Sidebar
            onChange={(fieldName, destination) =>
              this.setState({ [fieldName]: destination })
            }
            onClick={transportation => this.setState({ transportation })}
            currentLocation={this.state.currentLocation}
            destination={this.state.destination}
            transportation={this.state.transportation}
            renderMap={this.state.renderMap}
            renderMapWithTMode={this.state.renderMapWithTMode}
          />
          <div className='map'>
            {this.state.initialCenter ? (
              <Maps
                initialCenter={this.state.initialCenter}
                origin={this.state.currentLocation}
                destination={this.state.destination}
                travelMode={this.state.transportation}
                setEmittedCO2={this.setEmittedCO2}
                setShouldUpdateMap={bool =>
                  this.setState({ shouldUpdateMap: bool })
                }
                shouldUpdateMap={this.state.shouldUpdateMap}
                setTravelMode={travelMode =>
                  this.setState({ transportation: travelMode })
                }
                setRenderMapFunc={func => this.setState({ renderMap: func })}
                setRenderMapFuncWithTMode={func =>
                  this.setState({ renderMapWithTMode: func })
                }
              >
                Maps
              </Maps>
            ) : null}
          </div>
        </div>
        <Trivia
          travelMode={this.state.transportation}
          amount={this.state.amount}
        />
      </div>
    );
  }
}

export default App;
