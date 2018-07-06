import React from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';

import getCampaignAt from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Router, Link} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      recipient: '',
      errMessage: '',
      loading: false
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
    this.setState({
      loading: true,
      errMessage: ''
    });
    const campaign = getCampaignAt(this.props.address);
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
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <Form onSubmit={event => {
            this.onSubmit(event);
          }}
          error={!!this.state.errMessage}
        >
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
          <Message error header="Oops!" content={this.state.errMessage} />
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;