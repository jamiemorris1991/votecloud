import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import '../styles/voter.css';
import { resolve } from 'path';

export default class Voter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: {
        _id: "",
        title: "",
        options: []
      }
    }
  }

  componentDidMount() {
    axios.get(`/latest`)
    .then(res => {
      this.setState({vote: res.data});
    })
  }

  selectOption(choice) {
    console.log(this.state.vote)
    const request = {
      id: this.state.vote._id,
      option: choice.text
    }
    axios.put(`/vote/option`, request)
    .then(res => {
      console.log(res.status);
    })

    //TODO Remove this block
    let newOptions = this.state.vote.options;
    const index = this.state.vote.options.findIndex(option => choice.text === option.text);
    newOptions[index].value++;
    this.setState({
      vote: {
        options: newOptions
      }
    });
  }
  
  renderOption(option) {
    return (
      <div 
        className="option"
        key={option.text}>
        <Option
          text={option.text}
          value={option.value}
          onClick={() => this.selectOption(option)} />
      </div>
    )
  }

  render() {
    return (
      <div classtext="container-fluid">
        {this.state.vote.options.map(option => {
          return this.renderOption(option);
        })}
      </div>
    );
  }
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