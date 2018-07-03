import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') { // in browser and has metamask
  web3 = new Web3(window.web3.currentProvider);
} else { // server or no metamask
  const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/QMjlpARxJBrcDKChTfPB');
  web3 = new Web3(provider);
}

export default web3;