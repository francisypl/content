pragma solidity ^0.4.15;

import './SafeMath.sol';

contract Publisher {
    
    using SafeMath for uint256;
    
    address owner;
    string public privateKey;
    uint256 public price;
    
    address[] promoters;
    address[] paidConsumers;

    mapping(address => bool) paid;
    mapping(address => uint256) promoterPayments; 

    function Publisher(string _privateKey, uint256 _price) payable {
        owner = msg.sender;
        privateKey = _privateKey;
        price = _price * 1000000000000000000;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }

    // Consumers
    // payment will pay and push to address=>boolean mapping
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
   
    function getKey() constant returns (string) {
        require(
            paid[msg.sender] == true
        );
        
        return privateKey;
    }

    function getContractAddress() constant returns (address) {
        return this;
    }
    
    function returnOne() constant returns (uint256) {
        return 1;
    }

    function cashOut() {
        owner.transfer(this.balance);
    }
}