import React from 'react';
import {Grid, Card, Button} from 'semantic-ui-react';

import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import getCampaignAt from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes'

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = getCampaignAt(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campain, and can create requests to withdraw funds.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver.',
      },
      {
        header: requestCount,
        meta: 'Number of requests',
        description: 'A request tries to withdraw money from the contract, which has to be approved by approvers.',
        style: {}
      },
      {
        header: approversCount,
        meta: 'Numbers of approvers',
        description: 'Number of people who have already donated to this campaign.',
        style: {}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description: 'The blance is how much money the campaign has left to spend.',
        style: {}
      },
    ];
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>CampaignShow</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;