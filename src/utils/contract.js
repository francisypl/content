import Web3 from 'web3';
import contract from 'truffle-contract';

import PublisherContract from '../truffle/build/contracts/Publisher.json';

async function deployContract(MyContract, key, price) {
  const contractInstance = await MyContract.new();
  await contractInstance.setData(key, price);
  return contractInstance.address;
}

function initWeb3() {
  const provider =
    typeof window !== 'undefined'
      ? window.web3.currentProvider
      : new Web3.providers.HttpProvider('http://localhost:8545');
  const web3 = new Web3(provider);
  const MyContract = contract(PublisherContract);
  MyContract.setProvider(web3.currentProvider);

  const account = web3.eth.accounts;
  console.log('account =>', account[0]);
  MyContract.defaults({
    from: account[0],
    gas: 4712388,
    gasPrice: 1000000000,
  });

  return { ...MyContract };
}

export { deployContract, initWeb3 };
