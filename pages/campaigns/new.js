import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';

import Layout from '../../components/Layout';

class CampaignNew extends React.Component {
  constructor() {
    super();
    this.state = {
      minimumContribution: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      minimumContribution: event.target.value
    });
  }

  onSubmit() {
    
  }

  render() {
    return (
      <Layout>
        <h3>Create A Campaign</h3>
        <Form>
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
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;