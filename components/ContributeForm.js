import React from 'react';
import {Form, Input, Message, Label, Button} from 'semantic-ui-react'

import getCampaignAt from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      errMessage: '',
      loading: false
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    const campaign = getCampaignAt(this.props.address);
    this.setState({
      loading: true,
      errMessage: ''
    });
    try { 
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({
        errMessage: err.message
      });
    }
    this.setState({
      loading: false,
      value: ''
    });
  }

  render() {
    return (
      <Form onSubmit={event => {
          this.onSubmit(event);
        }}
        error={!!this.state.errMessage}
      >
        <Form.Field>
          <Label>Amount to contribute</Label>
          <Input label="ether" labelPosition="right" 
            value={this.state.value}
            onChange={event => {
              this.onInputChange(event);
            }}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errMessage} />
        <Button primary loading={this.state.loading}>Contribute</Button>
      </Form>
    );
  }
}

export default ContributeForm;