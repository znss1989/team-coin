import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instCampaignFactory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x2BE906655B67E3c70b62C298f208671a7A0FA044'
);

export default instCampaignFactory;