import React from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import getCampaignAt from '../ethereum/campaign';

class RequestRow extends React.Component {
  constructor() {
    super();
    this.onApprove = this.onApprove.bind(this);
    this.onFinalize = this.onFinalize.bind(this);
  }

  async onApprove() {
    const campaign = getCampaignAt(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({from: accounts[0]});
  }

  async onFinalize() {
    const campaign = getCampaignAt(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
  }

  render() {
    const {id, request, approversCount} = this.props;
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
        <Table.Cell>
          <Button color="green" basic onClick={this.onApprove}>Approve</Button>
        </Table.Cell>
        <Table.Cell>
          <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default RequestRow;