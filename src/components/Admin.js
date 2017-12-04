import React, { Component } from 'react';
import { Button, Form, Input, ListGroup, ListGroupItem, Badge, Col, Row, Table, Container} from 'reactstrap';
import axios from 'axios';
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.removeVote = this.removeVote.bind(this);
    this.state = {
      currentVote: {},
      newVote: {
        options: [],
        votingLive: false
      },
      newOption: {
        text: "",
        value: 0
      },
      previousVotes: []
    };
  }

  componentDidMount() {
    axios.get(`/votes/current`)
      .then(res => {
        this.setState({ currentVote: res.data });
      });
    axios.get(`/votes/previous`)
      .then(res => {
        this.setState({ previousVotes: res.data });
      });
  }

  handleChange(event) {
    this.setState({newOption: {
      text: event.target.value,
      value: 0
    }});
  }

  addOption(event) {
    event.preventDefault();
    this.setState({
      newVote: {
        options : [...this.state.newVote.options, this.state.newOption]
      },
      newOption: {text:"",value: 0}
    });
  }

  deleteOption(option) {
    let array = this.state.newVote.options;
    const index = array.indexOf(option);
    array.splice(index, 1);
    this.setState({newVote: {options: array} });
  }

  reset() {
      if (window.confirm("Are you sure? This will reset all scores for this vote to zero!") === true) {
        const request = {
          id: this.state.currentVote._id
        };
        axios.put(`/vote/reset`, request)
          .then(res => {
            this.setState({currentVote: res.data})
          });
      }
      else return;
  }

  removeVote(vote) {
    let votes = this.state.previousVotes;
    const index = votes.indexOf(vote);
    votes.splice(index, 1);
    axios.delete(`/votes/` + vote._id)
    .catch(error => console.log(error))
    .then(res =>
      this.setState({previousVotes: votes})
    );
  }

  startNewVote(){
    console.log(this.state.newVote);
    if (window.confirm("This will start a new vote and end the previous") === true) {
      const endVoteRequest = {id: this.state.currentVote._id};

      axios.put(`/vote/end`, endVoteRequest)
        .then(res => {
          this.setState({previousVotes: [...this.state.previousVotes, res.data]})
          return axios.post(`/vote/new`, this.state.newVote);
        })
        .then(res => {
          this.setState({
            newVote: {
              options: [],
              votingLive: false
            },
            currentVote: res.data,
          })
        })
    }
    else return;
  }

  renderForm() {
    return (
      <Form onSubmit={this.addOption}>
        <Input id="addOption" type="text" placeholder="Add Option"  value={this.state.newOption.text} onChange={this.handleChange}/>
      </Form>
    );
  }

  render() {
    return (
      <Container>
        <Row>
            <Col md="6">
              <div className="flex-row d-flex clearfix justify-content-between">
                <h3>New Vote</h3>
                <SumbitButton
                    disabled={this.state.newVote.options.length < 2}
                    onClick={() => this.startNewVote()}/>
              </div>
              <OptionList
                className="flex-row"
                options={this.state.newVote.options}
                onClick={this.deleteOption}/>
                {this.renderForm()}
            </Col>
          </Row>
          <hr/>
          <Row>
            <h3>
              Current Vote &nbsp;
              <ResetButton onClick={() => this.reset()}/>
            </h3>
            <VoteTable 
              votes={[this.state.currentVote]}/>
          </Row>
          <Row>
            <h3>Previous Votes</h3>
            <VoteTable 
              votes={this.state.previousVotes}
              onClick={this.removeVote}/>
          </Row>
        </Container>
    );
  }
}

function VoteTable(props) {
  const votes = props.votes || [];
  const rows = votes.length > 0 ? votes.map((vote, i) =>
    <tr key={i}>
      <th scope="row">
          {props.onClick && 
            <Badge onClick={() => props.onClick(vote)}>X</Badge>
          }
        </th>
        <TableRow options={vote.options}></TableRow>
    </tr>
  )
  : <div>No Live vote!</div>

  return (
    <Table responsive striped>
      {votes.length > 0 &&
        <tbody>
          {rows}
        </tbody>
      }
    </Table>
  );
}

function TableRow(props) {
  const options = props.options || [];
  return (
    options.map((option) =>
      <td key={option.text}>
        {option.text} - {option.value }
      </td>
    )
  );
}


function OptionList(props) {
  const options = props.options || [];
  const listItems = options.map((option) =>
    <ListGroupItem key={option.text}>
      <span className="float-left">{option.text}</span>
      <Badge className="float-right" onClick={() => props.onClick(option)}>X</Badge>
    </ListGroupItem>
  );
  return (
    <div>
      <ListGroup>{listItems}</ListGroup>
    </div>
  );
}

function ResetButton(props) {
  return(
    <Button 
      color="link"
      onClick={props.onClick}>
      Reset current scores
    </Button>
    );
}

function SumbitButton(props) {
  return(
    <Button 
      color="primary"
      disabled ={props.disabled}
      onClick={props.onClick}>
      Start Vote
    </Button>
    );
}