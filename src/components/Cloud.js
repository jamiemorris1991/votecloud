import React, { Component } from 'react';
import WordCloud from './WordCloud';
import axios from 'axios';

export default class Cloud extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vote: {
        title: "No Votes yet!",
        options: []
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidMount() {
    this.getVotes();
    this.interval = setInterval(() => {
      this.getVotes();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getVotes() {
    axios.get(`/votes/current`)
    .then(({ data }) => {
      if (data) {
        this.setState({ vote: data });
      }
    })
  }

  render() {
    return (
      <div className="cloud">
        <WordCloud
          width="1000"
          height="800"
          data={this.state.vote.options}
          rotate={() => Math.round(Math.random() * 4) * 90}
          fontSizeMapper={word => 20 + (Math.exp(word.value / 5) * 20)}
          fontWeightMapper={word => Math.min(300 + (word.value * 100), 1000)}
        />
      </div>
    )
  }
}
