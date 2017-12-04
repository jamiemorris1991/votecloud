import React, { Component } from 'react';
import WordCloud from './WordCloud';
import axios from 'axios';

export default class Cloud extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestVote: {
        title: "No Votes yet!",
        options: []
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidMount() {
    axios.get(`/votes/current`)
    .then(res => {
      this.setState({latestVote: res.data});
    })
  }

  render() {
    return (
      <div className="cloud">
        <WordCloud
          width="1000"
          height="800"
          data={this.state.latestVote.options}
          fontSizeMapper={word => 20 + (Math.pow(word.value, 2) * 4)}
          rotate={() => (Math.floor(Math.random() * (181) + 90) + 180) % 360}
          fontWeightMapper={word => Math.min(300 + (word.value * 100), 1000)}
        />
      </div>
    )
  }
}
