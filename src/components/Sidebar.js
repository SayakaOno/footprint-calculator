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
    option: 'departureTime',
    time: '08:00:00',
    date: 'May 5, 2019'
  };

  shouldRenderMap = event => {
    if (
      this.props.transportation &&
      this.props.currentLocation &&
      this.props.destination &&
      (event.target.tagName === 'SELECT' ||
        (event.target.tagName === 'INPUT' && event.keyName === 'ENTER'))
    ) {
      return true;
    }
    return false;
  };

  handleInput = (event, fieldName) => {
    this.props.onChange(fieldName, event.target.value);

    if (event.target.tagName === 'SELECT') {
      this.setState({ [event.target.name]: event.target.value });
      if (this.shouldRenderMap(event)) {
        this.props.renderMapWithTMode(
          this.props.travelMode,
          event.target.name === 'option'
            ? event.target.value
            : this.state.option,
          this.getTime(
            event.target.name === 'date' ? event.target.value : this.state.date,
            event.target.name === 'time' ? event.target.value : this.state.time
          )
        );
      } else if (this.props.currentLocation && this.props.destination) {
        this.props.renderMap();
      }
    }
  };

  onEnterHit = event => {
    if (event.key === 'Enter') {
      if (
        this.props.transportation &&
        this.props.currentLocation &&
        this.props.destination
      ) {
        this.props.renderMapWithTMode(
          this.props.travelMode,
          this.state.option,
          this.getTime(this.state.date, this.state.time)
        );
      } else if (this.props.currentLocation && this.props.destination) {
        this.props.renderMap();
      }
    }
  };

  handleTransportation = travelMode => {
    this.props.onClick(travelMode);
    if (this.props.currentLocation && this.props.destination) {
      this.props.renderMapWithTMode(
        travelMode,
        this.state.option,
        this.getTime(this.state.date, this.state.time)
      );
    }
  };

  getTime = (date, time) => {
    return new Date(date + ' ' + time);
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
          onKeyDown={this.onEnterHit}
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
          onKeyDown={this.onEnterHit}
          placeholder='ending point'
        />
        <select
          id='option'
          name='option'
          type='text'
          value={this.state.option}
          onChange={e => this.handleInput(e, 'option')}
        >
          <option value='departureTime'>leave by</option>
          <option value='arrivalTime'>arrive by</option>
        </select>
        <select
          id='time'
          name='time'
          type='text'
          value={this.state.time}
          onChange={e => this.handleInput(e, 'time')}
        >
          <option value='08:00:00'>8:00</option>
          <option value='08:30:00'>8:30</option>
          <option value='09:00:00'>9:00</option>
        </select>
        <select
          id='date'
          name='date'
          type='text'
          value={this.state.date}
          onChange={e => this.handleInput(e, 'date')}
        >
          <option value='May 5, 2019'>May 5, 2019</option>
          <option value='May 6, 2019'>May 6, 2019</option>
          <option value='May 7, 2019'>May 7, 2019</option>
        </select>
        <ul className='buttons'>
          <li
            onClick={() => this.handleTransportation('DRIVING')}
            className={
              this.props.transportation === 'DRIVING' ? 'chosen' : null
            }
          >
            <span>
              <img alt='' src={driving_icon} />
            </span>
            <img alt='driving' src={driving} />
          </li>
          <li
            onClick={() => this.handleTransportation('TRANSIT')}
            className={
              this.props.transportation === 'TRANSIT' ? 'chosen' : null
            }
          >
            <span>
              <img alt='' src={transit_icon} />
            </span>
            <img alt='transit' src={transit} />
          </li>
          <li
            onClick={() => this.handleTransportation('BICYCLING')}
            className={
              this.props.transportation === 'BICYCLING' ? 'chosen' : null
            }
          >
            <span>
              <img alt='' src={biking_icon} />
            </span>
            <img alt='biking' src={biking} />
          </li>
          <li
            onClick={() => this.handleTransportation('WALKING')}
            className={
              this.props.transportation === 'WALKING' ? 'chosen' : null
            }
          >
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
