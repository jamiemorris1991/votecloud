import React, { Component } from 'react';
import { Button } from 'reactstrap';
import WordCloud from 'react-d3-cloud';

import '../styles/voter.css';

let initialOptions = [
  {
    text: "Boring",
    value: 0
  },
  {
    text: "Fun",
    value: 0
  },
  {
    text: "Rubbish",
    value: 0
  },
  {
    text: "Great",
    value: 0
  },
  {
    text: "Enganging",
    value: 0
  },
  {
    text: "OK",
    value: 0
  },
  {
    text: "Awesome",
    value: 0
  },
  {
    text: "Pointless",
    value: 0
  },
];

export default class Voter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    for(let i=0;i<20;i++) {
      // initialOptions.add("Scott Logic");
    }
    this.setState({ options: initialOptions });
  }

  selectOption(choice) {
    let newOptions = this.state.options;
    const index = this.state.options.findIndex(option => choice.text === option.text);
    newOptions[index].value++;
    this.setState({options: newOptions})
  }
  
  renderOption(option) {
    const divStyle = {
      fontSize: 15 + option.value * 4 + "px"
    }

    return (
      <div 
        className="option"
        key={option.text}>
        <Option
          // size={divStyle}
          text={option.text}
          value={option.value}
          onClick={() => this.selectOption(option)} />
      </div>
    )
  }

  render() {
    return (
      <div classtext="container-fluid">
        {this.state.options.map(option => {
          return this.renderOption(option);
        })}
        <Cloud data={this.state.options}></Cloud>
      </div>
    );
  }
}

function Cloud(props) {
  return (
    <WordCloud
    data={props.data}
    fontSizeMapper={word => 10 + (Math.pow(word.value,2) * 4)}
    rotate={() => (Math.floor(Math.random()*(181)+90) + 180) % 360}
    font="helvetica"
    font-weight={word => 200 + (word.value * 100) }
  />
  )
}

function Option(props) {
  return (
    <Button
      classtext="option"
      style={props.size}
      onClick={props.onClick}>
      {props.text} {props.value}
    </Button>
  )
}

// word.value*10 % 360 +
// rotate={word =>  ( Math.floor(Math.random()*(181)+90) + 180) % 360}