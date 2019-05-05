import React from 'react';
import './sidebar.css';

class Sidebar extends React.Component {
  state = {
    distination: null
  };

  onButtonClick = () => {
    console.log('clicked');
  };

  handleInput = (event, fieldName) => {
    this.props.onChange(fieldName, event.target.value);
  };

  render() {
    return (
      <div className='sidebar bm-menu'>
        <h1>Carbon Footprint Calculator</h1>
        <label htmlFor='currentLocation'>A</label>
        <input
          id='currentLocation'
          name='currentLocation'
          type='text'
          value={this.props.currentLocation}
          onChange={e => this.handleInput(e, 'currentLocation')}
          placeholder='starting point'
        />
        <br />
        <label htmlFor='destination'>B</label>
        <input
          id='destination'
          name='destination'
          type='text'
          value={this.props.destination}
          onChange={e => this.handleInput(e, 'destination')}
          placeholder='ending point'
        />
        <ul className='buttons'>
          <li onClick={() => this.props.onClick('car')}>
            <img alt='car' src='' />
          </li>
          <li onClick={() => this.props.onClick('bus')}>
            <img alt='bus' src='' />
          </li>
          <li onClick={() => this.props.onClick('bicycle')}>
            <img alt='bicycle' src='' />
          </li>
          <li onClick={() => this.props.onClick('walk')}>
            <img alt='walk' src='' />
          </li>
        </ul>
        <div id='DirectionsPanel' />
      </div>
    );
  }
}

export default Sidebar;
