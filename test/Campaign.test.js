const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaignFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts(); // get 10 defalut accounts for testing
  factory = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface))
    .deploy({
      data: compiledCampaignFactory.bytecode
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  await factory.methods.createCampaign('100')
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it('marks the campaign creator as manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });
  it('allows user to contribute, thus becomes approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert.equal(isContributor, true);
  });
  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '50', // lower than threshold
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it('allows the manager to create a request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'Buy batteries');
  });
  it('processes a request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });
    await campaign.methods
      .createRequest('Buy apple', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
    const balanceStrInWei = await web3.eth.getBalance(accounts[1]);
    const balanceStrInEther = web3.utils.fromWei(balanceStrInWei, 'ether');
    const balance = parseFloat(balanceStrInEther);
    assert(balance > 104);
  });
});