import React from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends React.Component {
  constructor() {
    super();
    this.state = {
      minimumContribution: '',
      errMessage: '',
      loading: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      minimumContribution: event.target.value,
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      errMessage: false
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({
        errMessage: err.message
      });
    }
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Layout>
        <h3>Create A Campaign</h3>
        <Form 
          onSubmit={event => {
            this.onSubmit(event);
          }}
          error={!!this.state.errMessage}
        >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei" labelPosition="right" 
              value={this.state.minimumContribution} 
              onChange={(event) => {
                this.onInputChange(event);
              }} 
            />
          </Form.Field>
          <Message error header="Oops" content={this.state.errMessage}/>
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;