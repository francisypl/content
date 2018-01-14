pragma solidity ^0.4.15;

import './SafeMath.sol';

contract Publisher {
    
    using SafeMath for uint256;
    
    address owner;
    string public privateKey;
    uint256 public price;
        
    address[] paidConsumers;

    mapping(address => bool) paid;

    function Publisher() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }

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
   
    // for consumers
    function getKey() constant returns (string) {
        require(
            paid[msg.sender] == true
        );
        
        return privateKey;
    }

    function setData(string _privateKey, uint256 _price) {
        require(msg.sender == owner);
        privateKey = _privateKey;
        price = _price * 1000000000000000000;
    }

    function getPaidConsumers() constant returns (address[]) {
        return paidConsumers;
    }

    function getOwner() constant returns (address) {
        return owner;
    }

    function getContractAddress() constant returns (address) {
        return this;
    }
    
    function cashOut() {
        owner.transfer(this.balance);
    }
     
}