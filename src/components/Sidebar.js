import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

class Sidebar extends React.Component {
  state = {
    distination: null
  };

  handleInput = (event, fieldName) => {
    this.props.onChange(fieldName, event.target.value);
  };

  onButtonClick = () => {
    console.log('clicked');
  };

  render() {
    return (
      <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <input
          name='currentLocation'
          type='text'
          value={this.props.currentLocation}
          onChange={e => this.handleInput(e, 'currentLocation')}
        />
        <input
          name='destination'
          type='text'
          value={this.props.destination}
          onChange={e => this.handleInput(e, 'destination')}
        />
        <ul className='buttons'>
          <li onClick={() => this.props.transportation('car')}>
            <img alt='car' src='' />
            Car
          </li>
          <li>Bus</li>
          <li>Bicycle</li>
          <li>Walk</li>
        </ul>
      </Menu>
    );
  }
}

export default Sidebar;
