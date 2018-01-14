import Web3 from 'web3';
import contract from 'truffle-contract';

import PublisherContract from '../truffle/build/contracts/Publisher.json';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const MyContract = contract(PublisherContract);
MyContract.setProvider(provider);

// set default data for the contract
MyContract.defaults({
  from: '0xbec877997d295938eab641276dec3dcbbac43e38',
  gas: 4712388,
  gasPrice: 1000000000,
});

async function deployContract(key, price) {
  const contractInstance = await MyContract.new();
  await contractInstance.setPublisherData(key, price);
  return contractInstance.address;
}

export { deployContract };
