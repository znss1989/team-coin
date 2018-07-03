import React from 'react';
import factory from '../ethereum/factory';

class CampaignsIndex extends React.Component {
  async componentWillMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }

  render() {
    return (
      <div>CampaignsIndex</div>
    );
  }
}

export default CampaignsIndex;