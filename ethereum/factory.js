import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instCampaignFactory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xe488b93432d36d40A5310e2e7436f59f7968d375'
  
);

export default instCampaignFactory;