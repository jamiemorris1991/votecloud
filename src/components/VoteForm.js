import React, { Component } from 'react';

export default class VoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: [],
      newVote: 'New Vote'
    };
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Options:
          <input type="text"/>
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }

}