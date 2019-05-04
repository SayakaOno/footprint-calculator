import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

class Sidebar extends React.Component {
  state = {
    distination: null
  };

  handleInput = event => {
    this.props.onChange(event.target.value);
  };

  onButtonClick = () => {
    console.log('clicked');
  };

  render() {
    return (
      <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <input
          name='destination'
          type='text'
          value={this.state.locationA}
          onChange={this.handleInput}
        />
        <ul className='buttons'>
          <li onClick={this.onButtonClick}>
            <img src='' />
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
