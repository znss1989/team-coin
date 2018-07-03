import React from 'react';
import factory from '../ethereum/factory';

class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {
      campaigns
    };
  }

  render() {
    return (
      <div>CampaignsIndex</div>
    );
  }
}

export default CampaignsIndex;