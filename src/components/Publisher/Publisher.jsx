import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';

import PublisherContract from '../../truffle/build/contracts/Publisher.json';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let provider = new Web3.providers.HttpProvider('http://localhost:8545');

let MyContract = contract(PublisherContract);
MyContract.setProvider(provider);

// set default data for the contract
MyContract.defaults({
    from: '0xca122960eccd0bcd6ce485fcea90149eba423940',
    gas: 4712388,
    gasPrice: 1000000000,
});

class Publisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
        };
        this.deployContract = this.deployContract.bind(this);
    }

    async deployContract() {
        let contractInstance = await MyContract.new();
        console.log(contractInstance);
        let key = await contractInstance.getKey();

        console.log(`PRIVATE KEY BE THIS SHIT ${key}`);
        this.setState({ key })
    }

    deployContract() {
        let contractInstance;
        MyContract.new()
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getKey();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div style={{ marginLeft: 20 }}>
                <button onClick={this.deployContract}>DEPLOY CONTRACT</button>

                <div>Key: {this.state.key}</div>
                <p></p>
            </div>
        )
    }
}

export default Publisher;

