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

const RENDERMODE = { 0: 'Initial', 1: 'Travel' };

class Sidebar extends React.Component {
  state = {
    option: 'leaveNow',
    time: '',
    date: ''
  };

  setClosestDateAndTime = () => {
    let date = getCurrentDate();
    let time = getDefaultTime();
    this.setState({ time, date });
  };

  renderMode = (event = null) => {
    if (
      event &&
      !(
        event.target.tagName === 'SELECT' ||
        (event.target.tagName === 'INPUT' && event.keyName === 'ENTER')
      )
    ) {
      return false;
    }
    if (this.props.destination && this.props.currentLocation) {
      if (this.props.transportation) {
        return RENDERMODE[1];
      } else {
        return RENDERMODE[0];
      }
    } else {
      return false;
    }
  };

  handleInput = event => {
    this.props.onChange(event.target.name, event.target.value);
  };

  getNewestState = (field, value) => {
    if (field === 'option') {
      if (this.state.option === 'leaveNow') {
        return 'departureTime';
      }
      return this.state.option;
    } else if (value === 'leaveNow') {
      return '';
    } else {
      return this.state[field];
    }
  };

  handleSelect = event => {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });

    if (value === 'leaveNow') {
      value = 'departureTime';
      this.setState({ date: '', time: '' });
    } else if (
      !this.state.date &&
      !this.state.time &&
      (value === 'departureTime' || value === 'arrivalTime')
    ) {
      this.setClosestDateAndTime();
    }

    if (this.renderMode(event) === RENDERMODE[1]) {
      this.props.renderMapWithTMode(
        this.props.travelMode,
        event.target.name === 'option' ? value : this.getNewestState('option'),
        getTime(
          event.target.name === 'date'
            ? value
            : this.getNewestState('date', value),
          event.target.name === 'time'
            ? value
            : this.getNewestState('time', value)
        )
      );
    } else if (this.renderMode(event) === RENDERMODE[0]) {
      this.props.renderMap();
    }
  };

  onEnterHit = event => {
    if (event.key === 'Enter') {
      if (this.renderMode() === RENDERMODE[1]) {
        this.props.renderMapWithTMode(
          this.props.travelMode,
          this.getNewestState('option', this.state.option),
          getTime(this.state.date, this.state.time)
        );
      } else if (this.renderMode() === RENDERMODE[0]) {
        this.props.renderMap();
      }
    }
  };

  handleTransportation = travelMode => {
    this.props.onClick(travelMode);
    if (this.renderMode() === RENDERMODE[1]) {
      this.props.renderMapWithTMode(
        travelMode,
        this.getNewestState('option', this.state.option),
        getTime(this.state.date, this.state.time)
      );
    }
  };

  renderTimeOptions = () => {
    let hour = 0;
    let min = '00';
    let options = [];

    for (let i = 0; i < 48; i++) {
      let time = `${hour}:${min}`;
      let displayTime = `${hour > 12 ? hour - 12 : hour}:${min}`;
      options.push(
        <option value={time} key={i}>
          {displayTime} {hour >= 12 ? 'PM' : 'AM'}
        </option>
      );
      if (i % 2) {
        hour += 1;
        min = '00';
      } else {
        min = '30';
      }
    }
    return <React.Fragment>{options.map(option => option)}</React.Fragment>;
  };

  renderDateOptions = () => {
    let options = [];
    let date = new Date();
    for (let i = 0; i < 14; i++) {
      options.push(
        <option value={getCurrentDate(date)} key={i}>
          {getCurrentDate(date)}
        </option>
      );
      date.setDate(date.getDate() + 1);
    }
    return <React.Fragment>{options.map(option => option)}</React.Fragment>;
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
          onChange={e => this.handleSelect(e)}
        >
          <option value='leaveNow'>leave now</option>
          <option value='departureTime'>leave at</option>
          <option value='arrivalTime'>arrive by</option>
        </select>
        {this.state.option === 'leaveNow' ? null : (
          <React.Fragment>
            <select
              id='time'
              name='time'
              type='text'
              value={this.state.time}
              onChange={e => this.handleSelect(e)}
            >
              {this.renderTimeOptions()}
            </select>
            <select
              id='date'
              name='date'
              type='text'
              value={this.state.date}
              onChange={e => this.handleSelect(e)}
            >
              {this.renderDateOptions()}
            </select>
          </React.Fragment>
        )}
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

function getTime(date, time) {
  if (date && time) {
    return new Date(date + ' ' + time);
  } else {
    return new Date();
  }
}

function getDefaultTime() {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();
  if (currentMin < 30) {
    currentMin = 30;
  } else {
    currentMin = '00';
    currentHour++;
  }
  return `${currentHour}:${currentMin}`;
}

function getCurrentDate(date = new Date()) {
  date = date
    .toString()
    .split(' ')
    .splice(1, 3)
    .join(' ');
  return date;
}

export default Sidebar;
