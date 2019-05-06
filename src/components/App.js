import React from 'react';
import Sidebar from './Sidebar';
import './reset.css';
import Maps from './Maps/map';
import Trivia from './Trivia';
import './app.css';

class App extends React.Component {
  state = {
    initialCenter: {},
    currentLocation: '',
    destination: '',
    transportation: '',
    option: 'departureTime',
    time: '08:00:00',
    date: 'May 5, 2019',
    amount: null,
    shouldUpdateMap: false
  };

  componentDidMount = () => {
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

  getTime = () => {
    return new Date(this.state.date + ' ' + this.state.time);
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
            setShouldUpdateMap={bool =>
              this.setState({ shouldUpdateMap: bool })
            }
          />
          <div className='map'>
            {this.state.initialCenter ? (
              <Maps
                initialCenter={this.state.initialCenter}
                origin={this.state.currentLocation}
                destination={this.state.destination}
                travelMode={this.state.transportation}
                option={this.state.option}
                time={
                  this.state.time && this.state.date ? this.getTime() : null
                }
                setEmittedCO2={this.setEmittedCO2}
                setShouldUpdateMap={bool =>
                  this.setState({ shouldUpdateMap: bool })
                }
                shouldUpdateMap={this.state.shouldUpdateMap}
                setTravelMode={travelMode =>
                  this.setState({ transportation: travelMode })
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
