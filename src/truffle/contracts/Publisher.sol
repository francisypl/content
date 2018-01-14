pragma solidity ^0.4.15;

import './SafeMath.sol';

contract Publisher {
    
    using SafeMath for uint256;
    
    address owner;
    string public privateKey;
    uint256 public price;
    
    mapping(address => bool) paidConsumers;

    function Publisher() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() public constant returns (string) {
        return "fallback was called";
    }

    // Consumer pays for content through promoter address
    function purchaseKey(address promoter) public payable {
        require(
            msg.value >= price
        );
        // Returns money back to consumer if it's over the price
        if (msg.value > price) {
            uint256 amountTransferBack = msg.value.sub(price);
            msg.sender.transfer(amountTransferBack);
        }
        if (promoter == owner) {
            owner.transfer(price);
        } else {
            uint256 promoterPay = price.div(10);
            uint256 publisherPay = price.sub(promoterPay);
            promoter.transfer(promoterPay);
            owner.transfer(publisherPay);
        }
        paidConsumers[msg.sender] = true;
    }
   
    function getConsumerKey() public constant returns (string) {
        require(
            paidConsumers[msg.sender] == true
        );
        return privateKey;
    }

    // =====TODO=====
    // Allow publishers to configure promoter payrate
    function setPublisherData(string _privateKey, uint256 _priceInWei) public {
        require(
            msg.sender == owner
        );
        privateKey = _privateKey;
        price = _priceInWei;
    }
}

