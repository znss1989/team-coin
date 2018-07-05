import React from 'react';
import Layout from '../../components/Layout';
import getCampaignAt from '../../ethereum/campaign';

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = getCampaignAt(props.query.address);
    const summary = campaign.methods.getSummary().call();
    return {
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestCount: summary['2'],
      approversCount: summary['3'],
      manager: summary['4'],
    };
  }

  render() {
    return (
      <Layout>
        <h3>CampaignShow</h3>
      </Layout>
    );
  }
}

export default CampaignShow;