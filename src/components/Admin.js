import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Badge, Col} from 'reactstrap';
import axios from 'axios';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVote: {},
      newVote: {}
    };
  }

  componentDidMount() {
    axios.get(`/latest`)
      .then(res => {
        this.setState({ currentVote: res.data });
      })
  }

  handleSubmit(event) {
    alert('VoteAdded ' + this.state.value);
    event.preventDefault();
  }

  addVote(){

  }

  renderForm() {
    return (
      <Form inline>
        <Label for="exampleEmail">Add Vote</Label>
        <Input id="exampleEmail" placeholder="with a placeholder" />
        <Button onClick={() => this.addVote()}>Add</Button>
      </Form>
    );
  }

  render() {
    return (
      <div>
        <Col md="6">
          <h2>Current Vote</h2>
          <ResetButton
            onClick={() => this.reset()}/>
          <OptionList
            options={this.state.currentVote.options}/>
        </Col>
        {/* <Col md="6">
          <h2>New Vote</h2>
          <ResetButton
            onClick={() => this.reset()}/>
          <OptionList
            options={this.state.newVote.options}/>
            {this.renderForm()}
        </Col> */}
      </div>
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
      Reset
    </Button>
    );
}
