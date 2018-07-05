import React from 'react';
import Layout from '../../components/Layout';
import getCampaignAt from '../../ethereum/campaign';

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = getCampaignAt(props.query.address);
    return {

    };
  }

  render() {
    console.log("Haha");
    return (
      <Layout>
        <h3>CampaignShow</h3>
      </Layout>
    );
  }
}

export default CampaignShow;