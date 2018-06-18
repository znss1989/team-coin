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
  accounts = await web3.eth.getAccounts();
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
    console.log(factory);
    assert.ok(factory.option.address);
    assert.ok(campaign.option.address);
  });
});