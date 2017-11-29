import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';
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

  componentDidMount() {
    axios.get(`/latest`)
    .then(res => {
      this.setState({latestVote: res.data});
    })
  }

  render() {
    return (
      <div className="cloud">
        <h2>{this.state.latestVote.title}</h2>
        <WordCloud
          data={this.state.latestVote.options}
          fontSizeMapper={word => 10 + (Math.pow(word.value, 2) * 4)}
          rotate={() => (Math.floor(Math.random() * (181) + 90) + 180) % 360}
          font="helvetica"
          font-weight={word => 200 + (word.value * 100)}
        />
      </div>
    )
  }

}