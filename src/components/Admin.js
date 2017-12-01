import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Badge, Col, Row} from 'reactstrap';
import axios from 'axios';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.state = {
      currentVote: {},
      newVote: {
        title: "",
        options: []
      },
      newOption: {
        text: "",
        value: 0
      }
    };
  }

  componentDidMount() {
    axios.get(`/latest`)
      .then(res => {
        this.setState({ currentVote: res.data });
      })
  }



  handleChange(event) {
    this.setState({newOption: {
      text: event.target.value,
      value: 0
    }});
  }

  addOption(event) {
    event.preventDefault();
    this.setState({newVote: {
      options : [...this.state.newVote.options, this.state.newOption]
    }});
  }

  renderForm() {
    return (
      <Form onSubmit={this.addOption}>
        <Label for="exampleEmail">Add Option</Label>
        <Input id="exampleEmail" type="text" placeholder="Vote" onChange={this.handleChange}/>
      </Form>
    );
  }

  render() {
    return (
      <Row>
        <Col md="6">
            <h2>Current Vote</h2>
            <OptionList
              options={this.state.currentVote.options}/>
            <ResetButton
              onClick={() => this.reset()}/>
          </Col>
          <Col md="6">
            <h2>New Vote</h2>
            <OptionList
              options={this.state.newVote.options}/>
              {this.renderForm()}
              <SumbitButton
              onClick={() => this.reset()}/>
          </Col>
        </Row>
    );
  }
}

function OptionList(props) {
  const options = props.options || [];
  const listItems = options.map((option) =>
    <ListGroupItem key={option.text}>
      {option.text}
      {!props.canBeDeleted &&
        <Badge pill>{option.value }</Badge>
      }
      {props.canBeDeleted &&
        <Button onClick={props.onClick}>X</Button>
      }
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
      color="danger"
      onClick={props.onClick}>
      Reset Scores
    </Button>
    );
}

function SumbitButton(props) {
  return(
    <Button 
      color="primary"
      disabled
      onClick={props.onClick}>
      Add Vote
    </Button>
    );
}