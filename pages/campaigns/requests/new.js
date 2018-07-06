import React from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';

import getCampaignAt from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      recipient: ''
    };
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onRecipientChange = this.onRecipientChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static async getInitialProps(props) {
    const {address} = props.query;
    return {address};
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  onValueChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onRecipientChange(event) {
    this.setState({
      recipient: event.target.value
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    console.log("Onsubmit running...");
    console.log(this.props.address);
    const campaign = getCampaignAt(this.props.address);
    console.log(campaign);
    const { description, value, recipient } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={event => {
          this.onSubmit(event);
        }}>
          <Form.Field>
            <label>Description</label>
            <Input 
              value={this.state.description}
              onChange={event => {
                this.onDescriptionChange(event);
              }} 
            />
          </Form.Field>
          <Form.Field>
            <label>Value (ether)</label>
            <Input 
              value={this.state.value}
              onChange={event => {
                this.onValueChange(event);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input 
              value={this.state.recipient}
              onChange={event => {
                this.onRecipientChange(event);
              }}
            />
          </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;