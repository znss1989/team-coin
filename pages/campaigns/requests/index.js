import React from 'react';
import {Button, Table} from 'semantic-ui-react';

import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import getCampaignAt from '../../../ethereum/campaign';

class RequestIndex extends React.Component {
  static async getInitialProps(props) {
    const {address} = props.query;
    const campaign = getCampaignAt(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );
    return {address, requests, requestCount};
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval Count</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;