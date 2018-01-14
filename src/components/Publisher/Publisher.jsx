import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';

import PublisherContract from '../../truffle/build/contracts/Publisher.json';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const MyContract = contract(PublisherContract);
MyContract.setProvider(provider);

// set default data for the contract
MyContract.defaults({
  from: '0x3ca9efe38a216cab7852110311d1829609474dd4',
  gas: 4712388,
  gasPrice: 1000000000,
});

class Publisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: ''
    }
    this.deployContract = this.deployContract.bind(this);
  }

  async deployContract() {
    const contractInstance = await MyContract.new();
    await contractInstance.setData('fuck', 1);
    await contractInstance.payForKey({ value: 1000000000000000000 });
    const key = await contractInstance.getKey();
    console.log(`PRIVATE KEY BE THIS SHIT: ${key}`);
  }

  render() {
    return (
      <div style={{ marginLeft: 20 }}>
        <button onClick={this.deployContract}>DEPLOY CONTRACT</button>
            <p></p>
          </div>
    );
  }
}

export default Publisher;

