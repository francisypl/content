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
    from: '0xbec877997d295938eab641276dec3dcbbac43e38',
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
        try {
        let contractInstance = await MyContract.new(["adsadsa", "aasdsad"]);
        await contractInstance.payForKey({value: 12});
        let key = await contractInstance.getPrice();

        console.log(`PRIVATE KEY BE THIS SHIT ${key}`);
        // this.setState({ key })
        }
        catch (error) {
    console.log(error);
}
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

