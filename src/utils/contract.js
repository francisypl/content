import Web3 from 'web3';
import contract from 'truffle-contract';
import PublisherContract from '../truffle/build/contracts/Publisher.json';
import solc from 'solc';

const publishSource = `
pragma solidity ^0.4.15;

import './SafeMath.sol';

contract Publisher {
    
    using SafeMath for uint256;
    
    address owner;
    string public privateKey;
    uint256 public price;
        
    address[] paidConsumers;

    mapping(address => bool) paid;
    mapping(address => uint256) promoterPayments;
    mapping(address => string) promoterToURL;
    uint256 publisherPayment;

    function Publisher() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }

    // Consumer
    function payForKey() payable returns (string) {
        require(
            msg.value >= price
        );
        
        if (msg.value > price) {
            uint256 amountTransferBack = msg.value.sub(price);
            msg.sender.transfer(amountTransferBack);
        }
        
        if (paid[msg.sender] == false) {
            paidConsumers.push(msg.sender);
            paid[msg.sender] = true;
        }
    }
   
    function getConsumerKey() constant returns (string) {
        require(
            paid[msg.sender] == true
        );
        
        return privateKey;
    }

    function setPublisherData(string _privateKey, uint256 _price) {
        require(msg.sender == owner);
        privateKey = _privateKey;
        price = _price * 1000000000000000000;
    }

    function getPaidConsumers() constant returns (address[]) {
        return paidConsumers;
    }
    
    function publisherCashOut() {
        owner.transfer(publisherPayment);
    }

    // Promoter
    function setPromoterData(string _promoterURL) {
        promoterToURL[msg.sender] = _promoterURL;
    }

    function getPromoterURL() constant returns (string) {
        return promoterToURL[msg.sender];
    }
 
    function promoterCashOut() payable returns (uint256) {
        require (
            promoterPayments[msg.sender] > 0
        );
        msg.sender.transfer(promoterPayments[msg.sender]);    
    }
}
`;

const safeMathSource = `
pragma solidity ^0.4.11;

library SafeMath {
  function mul(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal constant returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal constant returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}
`;

const input = {
  'Publish.sol': publishSource,
  'SafeMath.sol': safeMathSource,
};

const compiled = solc.compile({ sources: input }, 1);
console.log(compiled);
const bytecode = compiled.contracts['Publish.sol:Publisher'].bytecode;
const abi = JSON.parse(compiled.contracts['Publish.sol:Publisher'].interface);


function timedDeployContract(myContract) {
  const provider = typeof window !== 'undefined'
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider('http://localhost:8545');
  const web3 = new Web3(provider);

  return new Promise(async (resolve) => {
    const actualContract = new web3.eth.Contract(abi);
    const createdContract = await actualContract.deploy({
      data: bytecode,
    }).send();
    const instance = myContract.at(createdContract.options.address);
    console.log('instance =>', instance);
    return resolve(instance);
  });
}

async function deployContract(myContract, key, price) {
  const contractInstance = await timedDeployContract(myContract);
  await contractInstance.setData(key, price);
  return contractInstance.address;
}

function initWeb3() {
  const provider = typeof window !== 'undefined'
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider('http://localhost:8545');
  const web3 = new Web3(provider);

  const MyContract = contract(PublisherContract);
  MyContract.setProvider(provider);

  const account = web3.eth.accounts;

  MyContract.defaults({
    from: account[0],
    gas: 4712388,
    gasPrice: 1000000000,
  });

  return { contract: MyContract };
}

export { deployContract, initWeb3 };
