import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import '../styles/voter.css';
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
        this.setState({ vote: res.data });
      })
  }

  selectOption(choice) {
    console.log(this.state.vote)
    const request = {
      id: this.state.vote._id,
      option: choice.text
    }
    axios.put(`/vote/choose`, request)
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

  reset() {
    if (window.confirm("Are you sure? This will reset all votes to zero!") === true) {
      const request = {
        id: this.state.vote._id,
      };
      axios.put(`/vote/reset`, request)
        .then(res => {
          this.setState({vote: res.data})
        });
    }
    else return;
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
      <div>
        <div className="container-fluid">
          {this.state.vote.options.map(option => {
            return this.renderOption(option);
          })}
        </div>
      </div>
    );
  }
}

function Option(props) {
  return (
    <Button
      style={props.size}
      onClick={props.onClick}>
      {props.text}
    </Button>
  )
}
