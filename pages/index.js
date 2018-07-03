import React from 'react';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';

class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {
      campaigns
    };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View campaign</a>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
        <h1>Team Coin</h1>
        {this.renderCampaigns()}
        <Button content="Create Campaign" icon="add" primary />
      </div>
    );
  }
}

export default CampaignsIndex;