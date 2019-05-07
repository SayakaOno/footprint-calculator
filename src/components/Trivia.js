import React from 'react';
import './trivia.css';

let trivias = [
  {
    trivia:
      'Climate change directly impacts the ability of women to achieve their own human rights and increases gender inequalities.',
    link:
      'https://quantaloop.io/woman-equality-climate-change/?mc_cid=8ca960fc43&mc_eid=84284b6054'
  },
  {
    trivia:
      'How is climate change altering precipitation in the U.S.? - Increase in both wet and dry extremes',
    link:
      'https://quantaloop.io/woman-equality-climate-change/?mc_cid=8ca960fc43&mc_eid=84284b6054'
  },
  {
    trivia:
      'Climate issues that cities & rural communities face includes the need to upgrade aging infrastructure.',
    link:
      'https://quantaloop.io/woman-equality-climate-change/?mc_cid=8ca960fc43&mc_eid=84284b6054'
  },
  {
    trivia:
      "Warming ocean temperatures are changing marine mammals' migratory patterns",
    link:
      'https://quantaloop.io/woman-equality-climate-change/?mc_cid=8ca960fc43&mc_eid=84284b6054'
  }
];

class Trivia extends React.Component {
  state = { number: null };
  componentDidMount() {
    this.setState({ number: Math.floor(Math.random() * trivias.length) });
  }
  render() {
    return (
      <div className='trivia'>
        <h2>DID YOU KNOW?</h2>
        <p className='trivia_container'>
          {trivias[0].trivia}
          {/* {this.state.number ? trivias[this.state.number].trivia : null}{' '}
          <a href={this.state.number ? trivias[this.state.number].link : null}>
            Learn more
          </a> */}
        </p>
        {this.props.amount && this.props.travelMode ? (
          <p className='emission'>
            Your {this.props.travelMode} has emitted {this.props.amount} kg of
            CO2.
          </p>
        ) : null}
      </div>
    );
  }
}

export default Trivia;
