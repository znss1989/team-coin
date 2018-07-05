import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instCampaignFactory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xD6dD84920bf369647209F14FF586e35891983dc0'
);

export default instCampaignFactory;