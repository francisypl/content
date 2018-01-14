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