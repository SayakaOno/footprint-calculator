import React from 'react';
import './sidebar.css';
import biking from '../images/biking.png';
import driving from '../images/driving.png';
import transit from '../images/transit.png';
import walking from '../images/walking.png';
import biking_icon from '../images/biking_icon.png';
import driving_icon from '../images/driving_icon.png';
import transit_icon from '../images/transit_icon.png';
import walking_icon from '../images/walking_icon.png';
import title from '../images/title.png';

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
        <h1>
          <img alt='carbon emissions calculator' src={title} />
        </h1>
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
          <li onClick={() => this.props.onClick('driving')}>
            <span>
              <img alt='' src={driving_icon} />
            </span>
            <img alt='driving' src={driving} />
          </li>
          <li onClick={() => this.props.onClick('transit')}>
            <span>
              <img alt='' src={transit_icon} />
            </span>
            <img alt='transit' src={transit} />
          </li>
          <li onClick={() => this.props.onClick('biking')}>
            <span>
              <img alt='' src={biking_icon} />
            </span>
            <img alt='biking' src={biking} />
          </li>
          <li onClick={() => this.props.onClick('walking')}>
            <span>
              <img alt='' src={walking_icon} />
            </span>
            <img alt='walking' src={walking} />
          </li>
        </ul>
        <div id='DirectionsPanel' />
      </div>
    );
  }
}

export default Sidebar;
